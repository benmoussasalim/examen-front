import {Component, OnInit} from '@angular/core';
import {ParticipationService} from "../../shared/services/participation.service";
import {ActivePerfRecorder} from "@angular/compiler-cli/src/ngtsc/perf";
import {ActivatedRoute, Router} from "@angular/router";
import {Reponse} from "../../shared/model/reponse";
import {ReponseService} from "../../shared/services/reponse.service";
import {ReponseCandidatService} from "../../shared/services/reponse-candidat.service";

import {ToastService} from "../../shared/services/toast.service";
import {Examen} from "../../shared/model/examen";
import {Candidat} from "../../shared/model/candidat";
import {ConfirmationService} from "primeng/api";


@Component({
  selector: 'app-participation',
  templateUrl: './participation.component.html',
  styleUrls: ['./participation.component.scss']
})
export class ParticipationComponent implements OnInit {
  questions: any[];
  selectedResp: any;
  selectedResponses: any[];
  private idExamen: any;
  private idCandidat: any;
  participation: any;
  configCount: any;

  constructor(private participationService: ParticipationService,
              private activatedRoute: ActivatedRoute,
              private reponsesCandidatService: ReponseCandidatService,
              private toastService: ToastService,
              private router: Router,
              private confirmService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.idExamen = this.activatedRoute.snapshot.paramMap.get('id');
    this.idCandidat = JSON.parse(localStorage.getItem('currentUser')!).id;

    this.participationService.create(this.idExamen, this.idCandidat).subscribe(res => {

      this.questions = res.questions;
      this.participation = res.participation;
      const currentDate = new Date();
      const dateParticipation = new Date(this.participation.dateParticipation);
      console.log(dateParticipation);
      const duree = this.participation.examen.duree;
      const dateFinish = new Date(dateParticipation.getTime() + duree * 60000);
      console.log(dateFinish);
      if (currentDate.getTime() > dateFinish.getTime() || this.participation.fini) {
       this.finishExamen();
      //  this.router.navigateByUrl( '/app/features/examen/participation/'+this.idExamen+'/result');

      } else {
        const rest = Math.abs((dateFinish.getTime() - currentDate.getTime()) / 1000)
        this.configCount = {leftTime: rest, notify: [600, 60]}
      }

    }, ex => console.log(ex));
  }

  checkSingle(reponses: any[], reponse: any): void {
    reponses = reponses.map(resp => {

      resp.statut = false;
      resp.participation = this.participation;
      return resp;
    });
    reponse.statut = true;
    this.saveReponses(reponses);
  }

  checkMultiple(reponses: any[], reponse: any): void {

    reponses = reponses.map(resp => {
      if (resp.id === reponse.id) {
        resp.statut = reponse.statut;
      }
      resp.participation = this.participation;

      return resp;
    });
    this.saveReponses(reponses);

  }

  saveReponses(reponses: any[]): void {
    this.reponsesCandidatService.save(reponses).subscribe(data => {

    }, ex => {
      this.toastService.error('Erreur', 'Opération non effectuée');
      console.log(ex);
    });
  }


  handleEvent(event: any): void {
    console.log(event);
    if (event.action === 'notify' && event.text === '00:01:00') {
      this.toastService.error('Attention', 'Il vous reste une minute');
    } else if (event.action === 'notify' && event.text === '00:10:00') {
      this.toastService.error('Attention', 'Il vous reste 10 minute');
    } else if (event.action === 'done') {
      this.finishExamen();
    }

  }

  finishExamen(): void {
    this.participationService.finishParticipation(this.participation).subscribe(data => {
      if (data.success) {
        this.toastService.success(data.message, data.detail);
        this.router.navigateByUrl( '/app/features/examen/participation/'+this.idExamen+'/result');
      }
    }, ex => {
      this.toastService.error('Erreur', 'Opération non effectuée');
      console.log(ex);
    })
  }

  terminerExam(event: any): void {
    this.confirmService.confirm({
      target: event.target,
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      message: 'Vous etes sur de terminer cet examen?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
      this.finishExamen();
      }
    });
  }
}
