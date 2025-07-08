import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

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

  constructor(private http: HttpClient) { }

  // get all confessions
  getAllConfessions(): Observable<Confession[]> {
    return this.http.get<Confession[]>(
      'https://api.rantsnconfess.com/v1/confessions'
    );
  }

  //create confession
  // createConfession():Observable<Confession>{
  //   return;
  // }


}
