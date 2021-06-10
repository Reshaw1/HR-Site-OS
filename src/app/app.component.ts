import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SysUserModel } from './models/SysUser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HR-Site-FE';

  constructor(private router: Router) {}

  authenthicatedUser: SysUserModel;
  userAuth: boolean = false;


  userAuthenticated(event) {
    this.authenthicatedUser = event;
    this.userAuth = true;
    this.router.navigateByUrl("/home");
  }
}
