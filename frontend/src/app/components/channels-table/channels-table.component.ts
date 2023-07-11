import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Channels } from 'src/app/channels';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-channels-table',
  templateUrl: './channels-table.component.html',
  styleUrls: ['./channels-table.component.css']
})
export class ChannelsTableComponent implements OnInit{
  channels: Channels[] = []

  constructor (private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getChannels().subscribe(response => {
      this.channels = response
    },error => {
      console.log(error)
    }) 
  }

  createChannel(channel: Channels){
    this.dashboardService.createChannel(channel).subscribe(response => {
      // console.log(response)
      this.channels.push(response)
    },error=>{
      console.log(error)
    })
  }

}
