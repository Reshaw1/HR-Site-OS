import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SysUserModel } from '../models/SysUser';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Input("user") User: SysUserModel;

  @Output() Logout = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onApplyNav() {
    this.router.navigate(["/create-candidate"], {
      queryParams: { userId: this.User.sysUser_Id, personId: this.User.sysUser_Person.person_Id },
    });
  }

  onCandNav() {
    this.router.navigate(["/manage-candidates"], {
      queryParams: { userId: this.User.sysUser_Id, personId: this.User.sysUser_Person.person_Id },
    });
  }

  onEmpNav() {
    this.router.navigate(["/manage-employees"], {
      queryParams: { userId: this.User.sysUser_Id, personId: this.User.sysUser_Person.person_Id },
    });
  }

  onLanguajeNav() {
    this.router.navigate(["/manage-languajes"], {
      queryParams: { userId: this.User.sysUser_Id, personId: this.User.sysUser_Person.person_Id },
    });
  }

  onDepartmentNav() {
    this.router.navigate(["/manage-departments"], {
      queryParams: { userId: this.User.sysUser_Id, personId: this.User.sysUser_Person.person_Id },
    });
  }

  onJobNav() {
    this.router.navigate(["/manage-jobs"], {
      queryParams: { userId: this.User.sysUser_Id, personId: this.User.sysUser_Person.person_Id },
    });
  }

  onLogout() {
    this.Logout.emit(true);
  }
}
