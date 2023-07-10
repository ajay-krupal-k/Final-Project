import { Component, Input, OnInit } from '@angular/core';
import { Invite } from 'src/app/invites';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() username!: string;

  ngOnInit(): void {
    
  }  
}
