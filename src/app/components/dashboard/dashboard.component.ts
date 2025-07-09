import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { ConfessionsService, Confession } from '../../core/services/confessions.service';
import { Observable, map } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { StatsCardComponent } from '../card/card.component';
import { EpisodesTableComponent } from '../episodes-table/episodes-table.component';
import { EpisodeService } from '../../core/services/episodes.service';
import { EpisodesComponent } from '../episodes/episodes.component';
import { ConfessionsComponent } from '../confessions/confessions.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl:'./dashboard.component.html',
  imports: [CommonModule,StatsCardComponent, EpisodesComponent,ConfessionsComponent],
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  confessions$: Observable<Confession[]>;
  total$: Observable<number>;
  episodesTotal$: Observable<number>;


  constructor(private confessionsService: ConfessionsService, private episodeService: EpisodeService) {
    this.confessions$ = this.confessionsService.confessions$;
    this.total$ = this.confessions$.pipe(map(confessions => confessions.length));
    this.episodesTotal$ = this.episodeService.total$;
  }

  ngOnInit(): void {
    this.confessionsService.fetchAllConfessions();
    this.episodeService.getEpisodes().subscribe();
  }
} 