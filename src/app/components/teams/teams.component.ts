import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsService } from '../../core/services/teams.service';
import { Team } from '../../core/model/model';
import { StatsCardComponent } from '../card/card.component';
import { TeamsSkeletonComponent } from './teams-skeleton.component';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [CommonModule, StatsCardComponent, TeamsSkeletonComponent],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss'
})
export class TeamsComponent implements OnInit {
  teams: Team[] = [];
  loading = false;
  error = '';

  constructor(private teamsService: TeamsService) {}

  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams(): void {
    this.loading = true;
    this.error = '';
    
    this.teamsService.getAllTeams().subscribe({
      next: (response) => {
        this.teams = response.data || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load teams. Please try again.';
        this.loading = false;
        console.error('Error loading teams:', err);
      }
    });
  }
}
