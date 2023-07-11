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
import { EditInviteComponent } from './components/edit-invite/edit-invite.component';
import { ChannelsTableComponent } from './components/channels-table/channels-table.component';
import { CreateChannelComponent } from './components/create-channel/create-channel.component';
import { DeleteWarningComponent } from './components/delete-warning/delete-warning.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    NotFoundPageComponent,
    LoginComponent,
    DashboardComponent,
    InvitesTableComponent,
    ModalComponent,
    EditInviteComponent,
    ChannelsTableComponent,
    CreateChannelComponent,
    DeleteWarningComponent
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
