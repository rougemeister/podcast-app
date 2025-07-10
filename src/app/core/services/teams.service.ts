import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Team, TeamResponse } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(private http: HttpClient) { }

  getAllTeams(): Observable<TeamResponse> {
    return this.http.get<TeamResponse>(`${environment.apiUrl}/team-members`);
  }
}
