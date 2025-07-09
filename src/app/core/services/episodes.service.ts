import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Episode, EpisodeResponse } from '../model/model';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  private http = inject(HttpClient);
  private episodesSubject = new BehaviorSubject<Episode[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);

  episodes$ = this.episodesSubject.asObservable();
  total$ = this.totalSubject.asObservable();

  constructor() {}

  getEpisodes(): Observable<EpisodeResponse> {
    return this.http.get<EpisodeResponse>(`${environment.apiUrl}/episodes`).pipe(
      tap((response) => {
        this.episodesSubject.next(response.data);
        this.totalSubject.next(response.meta.total ?? response.data.length);
        console.log(response.data)
      })
    );
  }

  get currentEpisodes(): Episode[] {
    return this.episodesSubject.getValue();
  }

  get totalEpisodes(): number {
    return this.totalSubject.getValue();
  }
}

