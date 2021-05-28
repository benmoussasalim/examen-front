import { Component, OnInit } from '@angular/core';
import {Candidat} from "../../shared/model/candidat";
import {CandidatService} from "../../shared/services/candidat.service";
import {Router} from "@angular/router";
import {ToastService} from "../../shared/services/toast.service";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.scss']

})
export class CandidatComponent implements OnInit {
  candidats: Candidat[];

  constructor(private candidatService: CandidatService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private toastService: ToastService
              ) {

  }

  ngOnInit(): void {
    this.getAll();

  }


  getAll() {
    this.candidatService.getAll().subscribe(data => {
      console.log(data);
      this.candidats = data;
    }, ex => console.log(ex));
  }

  changeState(candidat: Candidat) {
    this.candidatService.changeState(candidat).subscribe(res => {
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
