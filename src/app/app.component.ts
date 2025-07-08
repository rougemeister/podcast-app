import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConfessionsService, Confession } from './core/services/confessions.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'podcast-app';
  confessions: Confession[] = [];

  constructor(private confessionsService: ConfessionsService) {}

  ngOnInit(): void {
    this.confessionsService.getAllConfessions().subscribe({
      next: (data) => this.confessions = data,
      error: (err) => console.error('Failed to load confessions', err)
    });
  }
}
