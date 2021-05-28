import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/model/user";
import {AuthService} from "../../shared/services/auth.service";
import {LoginRequest} from "../../shared/model/login-request";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginRequest = new LoginRequest();
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.authenticate(this.loginRequest).subscribe(res => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('currentUser', JSON.stringify(res.user));
      this.router.navigate(['/app/dashboard']);
    }, ex => {
      console.log(ex);
    });
  }
}
