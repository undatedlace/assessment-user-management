import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';

interface Credential {
  id: string;
  username: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  login(username: string, password: string): Observable<boolean> {
    return this.http
      .get<Credential[]>(
        `${this.apiUrl}/credentials?username=${username}&password=${password}`
      )
      .pipe(
        map((credentials) => {
          if (credentials.length === 0) {
            throw new Error('Invalid username or password');
          }
          return true;
        })
      );
  }
}