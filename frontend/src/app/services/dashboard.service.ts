import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invite } from '../invites';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getInvites(): Observable<Invite[]>{
    const getInvitesURL = `${environment.apiURL}/invites/`

    return this.http.get<Invite[]>(
      getInvitesURL
    )
  }
}
