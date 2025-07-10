import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsService } from '../../core/services/teams.service';
import { Team } from '../../core/model/model';
import { StatsCardComponent } from '../card/card.component';
import { TeamsSkeletonComponent } from './teams-skeleton.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [CommonModule, StatsCardComponent, TeamsSkeletonComponent, FormsModule],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss'
})
export class TeamsComponent implements OnInit {
  teams: Team[] = [];
  loading = false;
  error = '';

  // Admin check (placeholder)
  isAdmin = true;

  // State for modals/forms
  showCreateModal = false;
  showEditModal = false;
  selectedTeam: Team | null = null;
  teamForm: Partial<Team> = {
    name: '',
    role: '',
    bio: '',
    profile_image: '',
    social_media_links: []
  };

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

  openCreateModal(): void {
    this.teamForm = {
      name: '',
      role: '',
      bio: '',
      profile_image: '',
      social_media_links: []
    };
    this.showCreateModal = true;
  }

  createTeam(): void {
    if (!this.teamForm.name || !this.teamForm.role) return;
    this.teamsService.createTeam(this.teamForm).subscribe({
      next: (team) => {
        this.teams.push(team);
        this.showCreateModal = false;
      },
      error: () => {
        this.error = 'Failed to create team.';
      }
    });
  }

  openEditModal(team: Team): void {
    this.selectedTeam = team;
    this.teamForm = { ...team, social_media_links: team.social_media_links || [] };
    this.showEditModal = true;
  }

  updateTeam(): void {
    if (!this.selectedTeam || !this.teamForm.name || !this.teamForm.role) return;
    this.teamsService.updateTeam((this.selectedTeam as any).id, this.teamForm).subscribe({
      next: (updated) => {
        const idx = this.teams.findIndex(t => (t as any).id === (updated as any).id);
        if (idx > -1) this.teams[idx] = updated;
        this.showEditModal = false;
        this.selectedTeam = null;
      },
      error: () => {
        this.error = 'Failed to update team.';
      }
    });
  }

  deleteTeam(team: Team): void {
    if (!(team as any).id) return;
    if (!confirm(`Delete team "${team.name}"?`)) return;
    this.teamsService.deleteTeam((team as any).id).subscribe({
      next: () => {
        this.teams = this.teams.filter(t => (t as any).id !== (team as any).id);
      },
      error: () => {
        this.error = 'Failed to delete team.';
      }
    });
  }

  closeModals(): void {
    this.showCreateModal = false;
    this.showEditModal = false;
    this.selectedTeam = null;
  }

  // Helper methods for social links
  addSocialLink() {
    if (!this.teamForm.social_media_links) this.teamForm.social_media_links = [];
    this.teamForm.social_media_links.push({ platform: '', url: '' });
  }

  removeSocialLink(index: number) {
    if (this.teamForm.social_media_links) {
      this.teamForm.social_media_links.splice(index, 1);
    }
  }

  getProfileImage(team: Team): string {
    return team.profile_image && team.profile_image.trim() !== ''
      ? team.profile_image
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(team.name)}&background=3b82f6&color=fff`;
  }
}
