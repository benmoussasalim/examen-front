import { Component, OnInit } from '@angular/core';
import {EntrepriseService} from "../../shared/services/entreprise.service";
import {Entreprise} from "../../shared/model/entreprise";
import {Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {ToastService} from "../../shared/services/toast.service";
import {Candidat} from "../../shared/model/candidat";

@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.scss']

})
export class EntrepriseComponent implements OnInit {
  entreprises: Entreprise[];
  entreprise: Entreprise = new Entreprise();
  constructor(private entrepriseService:EntrepriseService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private toastService: ToastService) { }

  ngOnInit(): void {
    this.getAll();
  }
  getAll() {
    this.entrepriseService.getAll().subscribe(data => {
      console.log(data);
      this.entreprises = data;
    }, ex => console.log(ex));
  }

  deleteEntreprise(id: any) {
    this.entrepriseService.deleteEntreprise(id).subscribe(res => {
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
  changeState(entreprise: Entreprise) {
    this.entrepriseService.changeState(entreprise).subscribe(res => {
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
}
