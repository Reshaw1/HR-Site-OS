import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GenreEnum } from '../enums/GenreEnum';
import { PersonModel } from '../models/person';
import { SysUserModel } from '../models/SysUser';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() userAuthenticated = new EventEmitter<SysUserModel>();

  newUser: SysUserModel;

  //Login properties
  userOrMail: string;
  password: string;

  userisAuthenticated: boolean = false;

  authenticatedUser: SysUserModel;

  authenticationFailed: boolean = false;

  genres: string[] = [
    "Masculino",
    "Femenino",
    "Otro"
  ]

  genre: string = "";

  confirmPassword: string = "";

  constructor( private loginService: LoginService) { }

  ngOnInit(): void {
    this.newUser = new SysUserModel;
    this.newUser.sysUser_Person = new PersonModel;
  }

  onLogin() {
    this.authenticationFailed = false;
    var counter = 0
    this.loginService.getUsers().subscribe((res: Array<SysUserModel>) => {
      console.log(res);
      for(let user of res) {
        if((this.userOrMail == user.sysUser_Username || this.userOrMail == user.sysUser_Person.person_Email) && this.password == user.sysUser_Password)
        {
          this.userisAuthenticated = true;
          this.authenticatedUser = user;
          console.log("Auth valid")
          this.onSetAuthUser()
          break
        }
        else
        {
          if((counter + 1) == res.length)
          {
            this.authenticationFailed = true
            console.log("Auth invalid")
          }
        }
        counter++
      }
    })
  }

  onSetAuthUser() {
    this.userAuthenticated.emit(this.authenticatedUser)
  }

  onCheckPassword() {
    if(this.newUser.sysUser_Password == this.confirmPassword) {
      return true;
    }
  }

  onRegister() {
    this.newUser.sysUser_Person.person_Genre = GenreEnum[this.genre];
    this.newUser.sysUser_Type = "Candidate";
    this.newUser.sysUser_Person.person_Card_Id = this.newUser.sysUser_Person.person_Card_Id.replace("-", "").replace("-", "");
    this.loginService.createUser(this.newUser).subscribe(res => {
      console.log("User Created")
    }, err => {
      console.log(err)
    })

    console.log(JSON.parse(JSON.stringify(this.newUser)));
  }

}
