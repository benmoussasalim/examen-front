import {Component, OnInit} from '@angular/core';
import {ExamenComponent} from "../examen/examen.component";
import {ExamenService} from "../../shared/services/examen.service";
import {Examen} from "../../shared/model/examen";
import {error} from "selenium-webdriver";
import {Theme} from "../../shared/model/theme";
import {ThemeService} from "../../shared/services/theme.service";
import {EntrepriseService} from "../../shared/services/entreprise.service";
import {Entreprise} from "../../shared/model/entreprise";

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
              private entrepriseService: EntrepriseService) {
  }

  ngOnInit(): void {
    this.getAll();
    this.getAllTheme();
    this.getAllEntreprise()
  }
  getAll(): void {

    const filterRequest = {theme: this.selectedTheme, entreprise: this.selectedEntreprise, libelle: this.libelle}
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
}
