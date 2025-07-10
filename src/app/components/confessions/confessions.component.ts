import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfessionsService, Confession } from '../../core/services/confessions.service';
import { ConfessionsCardComponent } from '../confessions-card/confessions-card.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-confessions',
  standalone: true,
  imports: [CommonModule, ConfessionsCardComponent],
  templateUrl: './confessions.component.html',
  styleUrl: './confessions.component.scss'
})
export class ConfessionsComponent implements OnInit, OnDestroy {
  confessions: Confession[] = [];
  loading = true;
  error: string | null = null;
  private destroy$ = new Subject<void>();
  isAdmin = false;

  constructor(private confessionsService: ConfessionsService, private authService: AuthService) {
    const user = this.authService.getUserFromStorage();
    this.isAdmin = user?.role === 'admin';
  }

  ngOnInit(): void {
    this.loadConfessions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadConfessions(): void {
    this.loading = true;
    this.error = null;
    this.confessionsService.fetchAllConfessions()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.confessions = response.data.slice(0, 10);
          this.confessionsService.setConfessions(response.data);
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load confessions. Please try again.';
          this.loading = false;
        }
      });
  }

  retryLoad(): void {
    this.loadConfessions();
  }

  handleApprovalToggled(confession: Confession) {
    // Toggle approval and update via service
    const updated = { ...confession, is_approved: !confession.is_approved };
    this.confessionsService.updateConfessionApproval(updated.id, updated.is_approved).subscribe({
      next: (updatedConfession) => {
        // Replace the old confession with the updated one in the array
        const idx = this.confessions.findIndex(c => c.id === updatedConfession.id);
        if (idx !== -1) {
          this.confessions[idx] = { ...this.confessions[idx], ...updatedConfession };
        }
      },
      error: () => {
        // Optionally show error
      }
    });
  }

  handleDeleteConfession(confession: Confession) {
    this.confessionsService.deleteConfession(confession.id).subscribe({
      next: () => {
        this.confessions = this.confessions.filter(c => c.id !== confession.id);
      },
      error: () => {
        // Optionally show error
      }
    });
  }
}
