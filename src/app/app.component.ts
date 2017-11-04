import { Component, OnInit } from '@angular/core';
import { MessagingService } from './core/messaging.service'
import { AuthService } from './core/auth.service';
import './utils/rxjs.operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  constructor(public msg: MessagingService, public auth: AuthService) { }

  ngOnInit() { 
    this.auth.user
    .filter(user => !!user) // filter null
    .take(1) // take first real user
    .subscribe(user => {
      if (user) {
        this.msg.getPermission(user)
        this.msg.monitorRefresh(user)
        this.msg.receiveMessages()
      }
    })
  }
  
}