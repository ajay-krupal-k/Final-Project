import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from 'src/app/post';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-createposts',
  templateUrl: './createposts.component.html',
  styleUrls: ['./createposts.component.css']
})
export class CreatepostsComponent implements OnInit {
  @Output() onCreatePosts: EventEmitter<Post> = new EventEmitter();
  @Input() modalId!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Output() onUpdatePosts: EventEmitter<Post> = new EventEmitter();

  postTitle!: string;
  postDescription!: string;
  formValue!: Post;

  constructor() { }

  ngOnInit(): void {
    this.postTitle = this.title ?? '';
    this.postDescription = this.description ?? '';
    console.log('Title',this.title)
  }

  onSubmit() {
    if (this.title && this.description) {
      this.formValue = {
        _id: this.modalId,
        title: this.postTitle,
        description: this.postDescription
      }
      this.onUpdatePosts.emit(this.formValue)
      return;
    }

    const formValue = {
      title: this.postTitle,
      description: this.postDescription
    }

    this.onCreatePosts.emit(formValue)

    this.postTitle = ''
    this.postDescription = ''
  }

}
