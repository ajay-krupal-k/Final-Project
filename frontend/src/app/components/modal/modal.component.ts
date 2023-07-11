import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Channels } from 'src/app/channels';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  channels: Channels[] = [];
  @Input() username:string = '';

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getChannels()
      .subscribe(response => {
        console.log(response)
        this.channels = response
      }, error => {
        console.log(error)
      })
  }

  onSubmit(form: NgForm): void{
    // console.log(this.checkedValues)
  }
}
