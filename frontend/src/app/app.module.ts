import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InvitesTableComponent } from './components/invites-table/invites-table.component';
import { ModalComponent } from './components/modal/modal.component';
import { ChannelsTableComponent } from './components/channels-table/channels-table.component';
import { CreateChannelComponent } from './components/create-channel/create-channel.component';
import { DeleteWarningComponent } from './components/delete-warning/delete-warning.component';
import { CardsComponent } from './components/cards/cards.component';
import { ChannelsDashComponent } from './components/channels-dash/channels-dash.component';
import { UsersDashComponent } from './components/users-dash/users-dash.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostComponent } from './components/post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    NotFoundPageComponent,
    LoginComponent,
    DashboardComponent,
    InvitesTableComponent,
    ModalComponent,
    ChannelsTableComponent,
    CreateChannelComponent,
    DeleteWarningComponent,
    CardsComponent,
    ChannelsDashComponent,
    UsersDashComponent,
    PostsComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
