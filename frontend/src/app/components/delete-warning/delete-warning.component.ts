import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/post';

@Component({
  selector: 'app-delete-warning',
  templateUrl: './delete-warning.component.html',
  styleUrls: ['./delete-warning.component.css']
})

export class DeleteWarningComponent implements OnInit {
  @Input() channelId!: string;
  @Output() onDeletePost: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    console.log('Inside Delete')
  }

  onSubmit(channelId: string){
    const cId = channelId.slice(1)
    this.onDeletePost.emit(cId)
  }
}
