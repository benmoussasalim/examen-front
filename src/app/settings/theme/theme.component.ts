import { Component, OnInit } from '@angular/core';
import {ThemeService} from "../../shared/services/theme.service";
import {Theme} from "../../shared/model/theme";
import {Router} from "@angular/router";
import {ToastService} from "../../shared/services/toast.service";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {
  theme: Theme = new Theme();
  themes: Theme[];
  display: boolean;
  constructor(private themeService: ThemeService,
              private confirmationService: ConfirmationService,
              private router: Router,
              private toastService: ToastService) {

  }

  ngOnInit(): void {
    this.getAll();
  }
addTheme(){
    this.add();
}
updateTheme(){
   this.update();
}
  getAll() {
    this.themeService.getAll().subscribe(data => {
      console.log(data);
      this.themes = data;
    },
        ex => console.log(ex));
  }
  private add() {
    this.themeService.addTheme(this.theme).subscribe(res => {
        if (res.success) {
          this.getAll();
          this.toastService.success(res.message, res.detail);
          this.router.navigate(['/app/settings/theme'])
          this.display= false;
        } else {
          this.toastService.warning(res.message, res.detail);
        }
      }, ex => {
        this.toastService.error('Erreur', 'Opération non effectuée');
        console.log(ex);
      }
    );
  }
  deleteTheme(id: any) {
    this.themeService.deleteTheme(id).subscribe(res => {
        if (res.success) {
          this.getAll();
          this.toastService.success(res.message, res.detail);
        } else {
          this.toastService.warning(res.message, res.detail);
        }
      }, ex => {
        this.toastService.error('Erreur', 'Opération non effectuée');
        console.log(ex);
      }
    );
  }
 showDialog() {
    this.display = true;
    this.theme = new Theme();
  }
  showDialogup(theme: Theme) {
    this.display = true;
    Object.assign(this.theme, theme);
  }

  confirm(event: any,id : number) {
    this.confirmationService.confirm({
      target: event.target,
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      message: 'Vous etes sur de supprimer cet thème?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteTheme(id);
      }
    });
  }

  private update() {
    this.themeService.updateTheme(this.theme).subscribe(res => {
        if (res.success) {
          this.getAll();
          this.toastService.success(res.message, res.detail);
          this.router.navigate(['/app/settings/theme'])
          this.display = false;
        } else {
          this.toastService.warning(res.message, res.detail);
        }
      }, ex => {
        this.toastService.error('Erreur', 'Opération non effectuée');
        console.log(ex);
      }
    );
  }


  valider(): void {
    if(this.theme.id) {
      this.update();
    } else {
      this.addTheme();
    }
  }
}

