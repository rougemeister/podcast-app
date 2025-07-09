import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { EpisodeService } from '../../core/services/episodes.service';
import { OnInit } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-episodes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.scss'
})
export class EpisodesComponent implements OnInit {
  private episodeService = inject(EpisodeService);
  episodes$ = this.episodeService.episodes$.pipe(
    map(episodes => episodes.slice(0, 10))
  );

  ngOnInit(): void {
    this.episodeService.getEpisodes().subscribe();
  }
}
