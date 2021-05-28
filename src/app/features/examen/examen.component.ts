import { Component, OnInit } from '@angular/core';
import {ExamenService} from "../../shared/services/examen.service";
import {Examen} from "../../shared/model/examen";
import {ConfirmationService} from "primeng/api";
import {Router} from "@angular/router";
import {ToastService} from "../../shared/services/toast.service";
import {ThemeService} from "../../shared/services/theme.service";
import {Theme} from "../../shared/model/theme";
import {Entreprise} from "../../shared/model/entreprise";
import {EntrepriseService} from "../../shared/services/entreprise.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.scss'],
  providers: [ConfirmationService]
})
export class ExamenComponent implements OnInit {
  examens: Examen[];
  examen: Examen = new Examen();
  themes: Theme[];
  theme: Theme=new Theme();
  entreprises: Entreprise[];
  entreprise: Entreprise=new Entreprise();

  constructor(private examenService: ExamenService,
              private datePipe: DatePipe,
              private confirmationService: ConfirmationService,
              private router :Router,
              private toastService: ToastService,
              private themeService:ThemeService,
              private entrepriseService:EntrepriseService) {
  }

  ngOnInit(): void {
    this.getAllEntreprise();
    this.getAllTheme();
    this.getAll();
  }
  getAllTheme(){
    this.themeService.getAll().subscribe(data => {
        console.log(data);
        this.themes = data;
      },
      ex => console.log(ex));
  }
  getAllEntreprise(){
    this.entrepriseService.getAll().subscribe(data => {
        console.log(data);
        this.entreprises = data;
      },
      ex => console.log(ex));
  }
  getByTheme(id :number){
    this.examenService.getByTheme(id).subscribe(data => {
        console.log(data);
        this.examens = data;
      },
      ex => console.log(ex));
  }
  getByEntreprise(id :number){
    this.examenService.getByEntreprise(id).subscribe(data => {
        console.log(data);
        this.examens = data;
      },
      ex => console.log(ex));
  }
  getByDateEpiration(date :Date){
    this.examenService.getByDateExpiration(new DatePipe('en-US').transform(date, 'yyyy/MM/dd')).subscribe(data => {
       console.log(new DatePipe('en-US').transform(date, 'yyyy/MM/dd'));
        console.log(data);
        this.examens = data;
      },
      ex => console.log(ex));
  }
  getAll() {
    const entreprise = JSON.parse(localStorage.getItem('currentUser')!);
    this.examenService.getByEntreprise(entreprise.id).subscribe(data => {
        console.log(data);
        this.examens = data;
      },
      ex => console.log(ex));
  }
  confirm(event: Event,id : number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteExamen(id);
        this.router.navigate(['/app/features/examen'])
      },
      reject: () => {
        this.router.navigate(['/app/features/examen'])
      }
    });
  }
  deleteExamen(id: any) {
    this.examenService.deleteexamen(id).subscribe(res => {
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
  clickAdd() {
    this.router.navigate(['/app/features/examen/new']);
  }
  clickEdit(id: any) {
    this.router.navigate(['/app/features/examen/edit/', id]);
  }
  listByTheme(id:number) {
    if(id) {
      this.getByTheme(id);
    } else {
      this.getAll();
    }

  }

  listByEntreprise(id:number) {
    if(id) {
      this.getByEntreprise(id);
    } else {
      this.getAll();
    }

  }

  listByDateExpiration(dateExpiration: any) {
    if(dateExpiration) {
      this.getByDateEpiration(dateExpiration);
    } else {
      this.getAll();
    }
  }
}
