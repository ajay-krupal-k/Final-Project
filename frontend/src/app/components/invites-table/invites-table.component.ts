import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Invite } from 'src/app/invites';

@Component({
  selector: 'app-invites-table',
  templateUrl: './invites-table.component.html',
  styleUrls: ['./invites-table.component.css']
})
export class InvitesTableComponent implements OnInit {
  invites: Invite[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getInvites()
      .subscribe(response => {
        console.log(response)
        this.invites = response
        console.log(this.invites)
      },error => {
        console.log(error)
      }) 
  }

  getformattedChannelName(invite: Invite): string {
    return invite.channels.map(channel => channel.name).join(', ')
  }

}
