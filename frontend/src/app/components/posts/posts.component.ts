import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/post';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit{
  channelId!: string;
  channelName!: string;
  posts: Post[] = [];

  constructor(private route: ActivatedRoute, private dashboardService: DashboardService) {}

    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.channelId = params['channelId']
      })

      this.channelName = this.route.snapshot.queryParams['name'];

      this.dashboardService.getPosts(this.channelId).subscribe(response => {
        this.posts = response
        console.log('Posts',response)
      }, error => {
        console.log(error)
      })
      
    }

}
