import { Component } from '@angular/core';
import { ConfessionsService, Confession } from '../../core/services/confessions.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-confessions-card',
  standalone: true,
  imports: [DatePipe,CommonModule],
  templateUrl: './confessions-card.component.html',
  styleUrl: './confessions-card.component.scss'
})
export class ConfessionsCardComponent {
  $confession$: Observable<Confession[]>;

  constructor(private confessionsService: ConfessionsService) {
    this.$confession$ = this.confessionsService.confessions$.pipe(
      map(confessions => confessions.slice(0, 10))
    );
  }

  trackById(index: number, confession: Confession) {
    return confession.id;
  }
}
