import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invite } from '../invites';
import { Channels } from '../channels';
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

  createInvites(invite: Invite): Observable<Invite>{
    const createInvitesURL = `${environment.apiURL}/invites/`

    return this.http.post<Invite>(
      createInvitesURL,
      invite
    )
  }

  updateInvites(invite: Record<string, any>): Observable<Invite>{
    const updateInviteURL = `${environment.apiURL}/invites/${invite['_id']}`

    console.log('Within Service',invite['fullName'])

    return this.http.patch<Invite>(
      updateInviteURL,
      {
        name: invite['fullName'],
        email: invite['userEmail'],
        channels: invite['channelsArray'],
        permissions: invite['checkArray']
      }
    )
  }

  getChannels(): Observable<Channels[]>{
    const getChannelsURL = `${environment.apiURL}/channels/`

    return this.http.get<Channels[]>(
      getChannelsURL
    )
  }

  createChannel(channel: Channels): Observable<Channels>{
    const createChannelURL = `${environment.apiURL}/channels/`

    return this.http.post<Channels>(
      createChannelURL,
      channel
    )
  }
}
