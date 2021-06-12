import {Component, OnInit} from '@angular/core';
import {ExamenComponent} from "../examen/examen.component";
import {ExamenService} from "../../shared/services/examen.service";
import {Examen} from "../../shared/model/examen";
import {error} from "selenium-webdriver";
import {Theme} from "../../shared/model/theme";
import {ThemeService} from "../../shared/services/theme.service";
import {EntrepriseService} from "../../shared/services/entreprise.service";
import {Entreprise} from "../../shared/model/entreprise";
import {Router} from "@angular/router";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-examen-not-expired',
  templateUrl: './examen-not-expired.component.html',
  styleUrls: ['./examen-not-expired.component.scss']
})
export class ExamenNotExpiredComponent implements OnInit {
  examens: any[];
  themes: Theme[];
  entreprises: Entreprise[];
  selectedEntreprise: Entreprise;
  selectedTheme: Theme;
  libelle: string;

  constructor(private examenService: ExamenService,
              private themeService: ThemeService,
              private entrepriseService: EntrepriseService,
              private router: Router,
              private confirmService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.getAll();
    this.getAllTheme();
    this.getAllEntreprise()
  }

  getAll(): void {
    const id = JSON.parse(localStorage.getItem('currentUser')!).id;
    const filterRequest = {
      theme: this.selectedTheme,
      entreprise: this.selectedEntreprise,
      libelle: this.libelle,
      idCandidat: id
    };
    this.examenService.getNotExpired(filterRequest).subscribe(data => {
      this.examens = data;
    }, ex => console.log(ex));
  }

  getAllTheme(): void {
    this.themeService.getAll().subscribe(data => {
      this.themes = data;
    }, ex => console.log(ex));
  }

  getAllEntreprise(): void {
    this.entrepriseService.getAll().subscribe(data => {
      this.entreprises = data;
    }, ex => console.log(ex));
  }
  passerExamen(event: any , id: any): void {
    this.confirmService.confirm({
      target: event.target,
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      message: 'Vous etes sur de passer cet examen?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
       this.router.navigate(['/app/features/examen/participation', id ]);
      }
    });
  }
}
