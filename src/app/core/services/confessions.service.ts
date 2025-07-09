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

  fetchAllConfessions(): void {
    this.http.get<any>(`${environment.apiUrl}/confessions`)
      .subscribe({
        next: (response) => {
          this.confessionsSubject.next(response.data);
        },
        error: (err) => {
          console.error('Failed to fetch confessions', err);
        }
      });
  }

  //create confession
  // createConfession():Observable<Confession>{
  //   return;
  // }

  // Returns the current number of confessions
  getConfessionsLength(): number {
    return this.confessionsSubject.getValue().length;
  }

}
