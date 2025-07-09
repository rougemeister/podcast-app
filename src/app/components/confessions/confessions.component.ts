import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfessionsService, Confession } from '../../core/services/confessions.service';
import { ConfessionsCardComponent } from '../confessions-card/confessions-card.component';

@Component({
  selector: 'app-confessions',
  standalone: true,
  imports: [CommonModule, ConfessionsCardComponent],
  templateUrl: './confessions.component.html',
  styleUrl: './confessions.component.scss'
})
export class ConfessionsComponent implements OnInit {
  confessions: Confession[] = [];

  constructor(private confessionsService: ConfessionsService) {}

  ngOnInit(): void {
    this.confessionsService.fetchAllConfessions();
    this.confessionsService.confessions$.subscribe(data => {
      this.confessions = data.slice(0, 10);
    });
  }
}
