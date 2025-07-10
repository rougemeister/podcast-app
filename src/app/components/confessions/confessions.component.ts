import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfessionsService, Confession } from '../../core/services/confessions.service';
import { ConfessionsCardComponent } from '../confessions-card/confessions-card.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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

  constructor(private confessionsService: ConfessionsService) {}

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
}
