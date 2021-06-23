import {Component, OnInit} from '@angular/core';
import {User} from "../../shared/model/user";
import {AuthService} from "../../shared/services/auth.service";
import {LoginRequest} from "../../shared/model/login-request";
import {ActivatedRoute, Router} from "@angular/router";
import {RegisterService} from "../../shared/services/register.service";
import {ToastService} from "../../shared/services/toast.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginRequest = new LoginRequest();

  constructor(private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private registerService: RegisterService,
              private toastService: ToastService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe(params => {

          if (params.token) {
          this.registerService.activatAccount(params.token).subscribe(res => {
            if(res.success) {
              this.toastService.success(res.message, res.detail);
            } else {
              this.toastService.warning(res.message, res.detail);
            }
          }, ex => {
            this.toastService.error('Erreur d\'activation', 'Opération non effectuée');
            console.log(ex);
          });
          }

        }
      );
  }

  login() {
    this.authService.authenticate(this.loginRequest).subscribe(res => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('currentUser', JSON.stringify(res.user));
      this.router.navigate(['/app/dashboard']);

    }, ex => {
      this.toastService.error('Erreur d\'authentification', 'Vérifier votre Email ou mot de passe');
      console.log(ex);
    });
  }
}
