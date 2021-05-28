import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {MessageService} from "primeng/api";
import {ToastService} from "../../shared/services/toast.service";
import {UserService} from "../../shared/services/user.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  pwd: any = {id: '', oldPassword: '', newPassword: '' };
  confirmerPassword: string;
  constructor(private userService: UserService,
              private messageService: ToastService) { }

  ngOnInit() {
  }
  changePwd() {
    this.pwd.id = JSON.parse(localStorage.getItem('currentUser')!).id;
    this.userService.changePassword(this.pwd).subscribe(
      data => {
        if (data.success) {
          this.messageService.success(data.message, data.detail);
          localStorage.clear();
          location.reload();

        } else {
          this.messageService.warning(data.message, data.detail);
        }
      },
      ex => {
        console.log(ex);
        this.messageService.error('Erreur:', 'Erreur de modification');
      }
    );
  }

}
