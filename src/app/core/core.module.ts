import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { MessagingService } from './messaging.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [MessagingService, AuthService]
})
export class CoreModule { }
