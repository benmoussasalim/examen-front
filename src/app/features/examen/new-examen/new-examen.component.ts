import { Component, OnInit } from '@angular/core';
import {Question} from "../../../shared/model/question";
import {Examen} from "../../../shared/model/examen";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastService} from "../../../shared/services/toast.service";
import {ExamenService} from "../../../shared/services/examen.service";
import {DatePipe} from "@angular/common";
import {ThemeService} from "../../../shared/services/theme.service";
import {Theme} from "../../../shared/model/theme";
@Component({
  selector: 'app-new-examen',
  templateUrl: './new-examen.component.html',
  styleUrls: ['./new-examen.component.scss']
})
export class NewExamenComponent implements OnInit {
  themes: Theme[];
  examens: Examen = new Examen();
  examen: Examen= new Examen();
  id: any;
  title: any;
  minDate: any;
  constructor(private router: Router,
              private datePipe: DatePipe,
              private activatedRoute: ActivatedRoute,
              private toastService: ToastService,
              private examenService: ExamenService,
              private themeService: ThemeService,) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.getById();
      this.title = 'Editer examen';

    }else
      this.title = 'Nouveau examen';
      this.minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      this.getAllTheme()
  }
  compareFn(c1: Theme, c2: Theme): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  getById() {
    this.examenService.examenById(this.id).subscribe(data => {
      this.examen = data;
      this.minDate = this.datePipe.transform(this.examen.dateCreation, 'yyyy-MM-dd')
    }, ex => {
      console.log(ex);
    });
  }
  getAllTheme(){
    this.themeService.getAll().subscribe(data => {
        console.log(data);
        this.themes = data;
      },
      ex => console.log(ex));
  }

  addExamen() {
    const entreprise = JSON.parse(localStorage.getItem('currentUser')!);
    this.examen.entreprise = entreprise;
    this.examenService.addexamen(this.examen).subscribe(res => {
      if (res.success) {
        this.toastService.success(res.message, res.detail);
        this.router.navigate(['/app/features/examen']);
      } else {
        this.toastService.warning(res.message, res.detail);
      }
    }, ex => {
      this.toastService.error('Erreur', 'Opération non effectuée');
      console.log(ex);
    });
  }

  annuler() {
    if(this.id) {
      this.getById();
    }
  }

  valider() {
    if (this.id) {
      this.update();
      console.log(this.examen)
    } else {
      this.addExamen();
    }
  }
  update() {
    this.examenService.updateexamen(this.examen).subscribe(res => {
      if (res.success) {
        this.toastService.success(res.message, res.detail);
        this.router.navigate(['/app/features/examen']);
      } else {
        this.toastService.warning(res.message, res.detail);
      }
    }, ex => {
      this.toastService.error('Erreur', 'Opération non effectuée');
      console.log(ex);
    });
  }

}
