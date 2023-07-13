import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from 'src/app/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() postTitle!: string;
  @Input() postDescription!: string;
  @Input() postId!: string;
  @Input() postCreatedOn!: string;
  @Input() permissions!: Array<any>;
  @Output() postUpdates: EventEmitter<Post> = new EventEmitter<Post>();
  @Output() postDelete: EventEmitter<string> = new EventEmitter();

  updatePosts(post: Post){
    this.postUpdates.emit(post)
    console.log('Child', post)
  }

  deletePosts(channelId: string){
    this.postDelete.emit(channelId)
  }
}
