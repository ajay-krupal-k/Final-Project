import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-warning',
  templateUrl: './delete-warning.component.html',
  styleUrls: ['./delete-warning.component.css']
})

export class DeleteWarningComponent implements OnInit {
  @Input() channelId!: string;

  ngOnInit(): void {
    console.log('Inside Delete')
  }
}
