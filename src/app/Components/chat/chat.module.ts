import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatLayoutComponent } from 'src/app/layouts/chat-layout/chat-layout.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ChatLayoutComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ChatModule { }
