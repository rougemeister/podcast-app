import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpisodeService } from '../../core/services/episodes.service';

@Component({
  selector: 'app-episodes-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './episodes-table.component.html',
  styleUrl: './episodes-table.component.scss'
})
export class EpisodesTableComponent implements OnInit {
  private episodeService = inject(EpisodeService);
  episodes$ = this.episodeService.episodes$;

  ngOnInit(): void {
    this.episodeService.getEpisodes().subscribe();
  }
}
