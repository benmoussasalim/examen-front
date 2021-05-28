import {Component, OnInit} from '@angular/core';
import {Candidat} from "../../shared/model/candidat";
import {RegisterService} from "../../shared/services/register.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {ToastService} from "../../shared/services/toast.service";
import {Entreprise} from "../../shared/model/entreprise";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  candidat = new Candidat();
  entreprise = new Entreprise();
  confirmPwd: string = '';
  isCandidat = true;

  constructor(private registerService: RegisterService,
              private router: Router,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
    if(this.router.url.endsWith('/entreprise')) {
      this.isCandidat = false;
    } else {
      this.isCandidat = true;
    }
  }


  valider() {
    if(this.isCandidat) {
      this.registerCandidat();
    } else {
      this.registerEntreprise();
    }

  }

  private registerCandidat() {
    this.registerService.registerCandidat(this.candidat).subscribe(res => {
        if (res.success) {
          this.toastService.success(res.message, res.detail);
          this.router.navigate(['/auth/login'])
        } else {
          this.toastService.warning(res.message, res.detail);
        }
      }, ex => {
        this.toastService.error('Erreur', 'Inscription non effectuée');
        console.log(ex);
      }
    );
  }

  private registerEntreprise() {
    this.registerService.registerEntreprise(this.entreprise).subscribe(res => {
        if (res.success) {
          this.toastService.success(res.message, res.detail);
          this.router.navigate(['/auth/login'])
        } else {
          this.toastService.warning(res.message, res.detail);
        }
      }, ex => {
        this.toastService.error('Erreur', 'Inscription non effectuée');
        console.log(ex);
      }
    );
  }
}
