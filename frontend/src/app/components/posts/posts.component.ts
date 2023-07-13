import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/post';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  channelId!: string;
  channelName!: string;
  posts: Post[] = [];
  permissions: Array<any> = []

  constructor(private route: ActivatedRoute, private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.channelId = params['channelId']
    })

    this.channelName = this.route.snapshot.queryParams['name'];

    this.dashboardService.getPosts(this.channelId).subscribe(response => {
      this.posts = response
      console.log('Posts', response)
    }, error => {
      console.log(error)
    })

    this.dashboardService.getPermissions().subscribe(response => {
      console.log('Permissions', response)
      this.permissions = response
      console.log(Array.isArray(response))
    }, error => console.log(error))

  }

  createPosts(post: Post) {
    console.log('Posts Component', post)

    const formValue = {
      ...post,
      channelId: this.channelId
    }

    this.dashboardService.createPosts(formValue).subscribe(response => {
      this.posts.push(response)
    }, error => {
      console.log(error)
    })
  }

  onUpdate(post: Post){
    this.dashboardService.updatePosts(post).subscribe(response => {
      console.log('Updated Post', response)
      const updatedIndex = this.posts.findIndex(post => post._id === response._id)

      if(updatedIndex !== -1){
        this.posts[updatedIndex].title = response.title
        this.posts[updatedIndex].description = response.description
      }
    }, error => {
      console.log(error)
    })
  }

  onDelete(channelId: string){
    this.dashboardService.deletePosts(channelId).subscribe(response => {
      console.log(response)
      this.posts = this.posts.filter(post => post._id !== channelId)
    }, error => {
      console.log(error)
    })
  }
}
