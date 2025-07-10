import { Component, Input } from '@angular/core';
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

  trackById(index: number, confession: Confession) {
    return confession.id;
  }
}
