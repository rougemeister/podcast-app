import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Confession } from '../../core/services/confessions.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-confessions-card',
  standalone: true,
  imports: [DatePipe,CommonModule],
  templateUrl: './confessions-card.component.html',
  styleUrl: './confessions-card.component.scss'
})
export class ConfessionsCardComponent {
  @Input() confession!: Confession;
  @Input() isAdmin: boolean = false;
  @Output() approvalToggled = new EventEmitter<void>();
  @Output() deleteClicked = new EventEmitter<void>();

  trackById(index: number, confession: Confession) {
    return confession.id;
  }

  onToggleApproval() {
    this.approvalToggled.emit();
  }

  onDeleteClicked() {
    this.deleteClicked.emit();
  }
}
