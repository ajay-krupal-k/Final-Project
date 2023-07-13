import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Invite } from 'src/app/invites';
import { MatDialog } from '@angular/material/dialog';
import { EditInviteComponent } from '../edit-invite/edit-invite.component';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-invites-table',
  templateUrl: './invites-table.component.html',
  styleUrls: ['./invites-table.component.css'],
})

export class InvitesTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'channels', 'status'];
  columnsToDisplay = [...this.displayedColumns, 'action']
  dataSource: Invite[] = [];

  // invites: Invite[] = [];

  constructor(private dashboardService: DashboardService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.dashboardService.getInvites()
      .subscribe(response => {
        this.dataSource = response
      }, error => {
        console.log(error)
      })
  }

  getformattedChannelName(invite: Invite): string {
    return invite.channels.map(channel => channel.name).join(', ')
  }

  openDialog(element?: Invite) {
    const dialogRef = this.dialog.open(EditInviteComponent, {
      data: element
    });

    dialogRef.componentInstance.onUpdateInvite.subscribe(response => {
      this.updateInvite(response)
    })

    dialogRef.componentInstance.onCreateInvite.subscribe(response => {
      this.createInvite(response)
    })

  }

  createInvite(invite: Invite) {
    this.dashboardService.createInvites(invite).subscribe(response => {
      this.dataSource.push(response)
      this.dataSource = this.dataSource.slice()
    }, error => {
      console.log(error)
    })
  }

  updateInvite(updatedInvite: Record<string, any>) {
    this.dashboardService.updateInvites(updatedInvite).subscribe(response => {
      const updatedIndex = this.dataSource.findIndex(invite => invite._id === updatedInvite['_id'])

      if (updatedIndex !== -1) {
        this.dataSource[updatedIndex].name = updatedInvite['fullName']
        this.dataSource[updatedIndex].email = updatedInvite['userEmail']
        this.dataSource[updatedIndex].channels = response.channels.map(channel => ({
          name: channel.name,
          description: channel.description
        }))
        this.dataSource[updatedIndex].permissions = updatedInvite['checkArray']
      }
    })
  }

  // ngOnInit(): void {
  //   this.dashboardService.getInvites()
  //     .subscribe(response => {
  //       console.log(response)
  //       this.invites = response
  //     }, error => {
  //       console.log(error)
  //     })
  // }

  // getformattedChannelName(invite: Invite): string {
  //   return invite.channels.map(channel => channel.name).join(', ')
  // }

  // createInvite(invite: Invite) {
  //   this.dashboardService.createInvites(invite).subscribe(response => {
  //     this.invites.push(response)
  //     console.log(response)
  //   }, error => {
  //     console.log(error)
  //   })
  // }

  // updateInvite(updatedInvite: Record<string, any>) {
  //   this.dashboardService.updateInvites(updatedInvite).subscribe(response => {
  //     console.log('Updated Response', response)
  //     const updatedIndex = this.invites.findIndex(invite => invite._id === updatedInvite['_id'])

  //     console.log('channelsArray', updatedInvite['channelsArray'])

  //     const channelsName = response.channels.map(channel => channel.name)
  //     console.log('Channels NAmes', channelsName)
  //     if (updatedIndex !== -1) {
  //       this.invites[updatedIndex].name = updatedInvite['fullName']
  //       this.invites[updatedIndex].email = updatedInvite['userEmail']
  //       this.invites[updatedIndex].channels = response.channels.map(channel => ({
  //         name: channel.name,
  //         description: channel.description
  //       }))
  //       this.invites[updatedIndex].permissions = updatedInvite['checkArray']

  //       console.log('updatedIndex', this.invites[updatedIndex])
  //     }
  //   })
  // }

  // onSubmit(){
  //   console.log('Edit Clicked')
  // }

}
