import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Confession {
  id: number;
  message: string;
  category: string;
  emotion: string;
  is_approved: boolean;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

@Injectable({
  providedIn: 'root'
})
export class ConfessionsService {
  private confessionsSubject = new BehaviorSubject<Confession[]>([]);
  confessions$ = this.confessionsSubject.asObservable();

  constructor(private http: HttpClient) { }

  fetchAllConfessions(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/confessions`);
  }

  setConfessions(confessions: Confession[]): void {
    this.confessionsSubject.next(confessions);
  }

  getConfessionsLength(): number {
    return this.confessionsSubject.getValue().length;
  }
}
