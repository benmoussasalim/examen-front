import {Component, OnInit} from '@angular/core';
import {ReponseCandidatService} from "../../../shared/services/reponse-candidat.service";
import {ActivatedRoute} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {InvitationService} from "../../../shared/services/invitation.service";
import {ToastService} from "../../../shared/services/toast.service";
import {ConfirmationService} from "primeng/api";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  participationResult: any;
  score = 0;
  invitation: any = {};
  visible = false;
  showFooter = false;
  minDate: any;
  constructor(private reponseCandidatService: ReponseCandidatService,
              private activatedRoute: ActivatedRoute,
              private invitationService: InvitationService,
              private toastService: ToastService,
              private confirmationService: ConfirmationService,
              private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.getByParticipationCandidat();
  }

  getByParticipationCandidat() {
    const idExamen = this.activatedRoute.snapshot.paramMap.get('idExam');
    const token = localStorage.getItem('token');
    const jwtHelper = new JwtHelperService();
    let idCandidat;
    if (token && !jwtHelper.isTokenExpired(token)) {
      const decodedToken = jwtHelper.decodeToken(token);
      const roles = decodedToken.roles;
      if (roles.includes('ROLE_ENTREPRISE')) {
        idCandidat = this.activatedRoute.snapshot.paramMap.get('idCandidat');
      } else {
        idCandidat = JSON.parse(localStorage.getItem('currentUser')!).id;
      }
    }

    this.reponseCandidatService.findByParticipation(idExamen, idCandidat).subscribe(data => {
      this.participationResult = data;
      this.score = this.participationResult.participation?.score / this.participationResult.participation.examen.nbrQuestion * 100;
      if (!this.participationResult.participation.invitation) {
        this.showFooter = true;
      }
    }, ex => {
      console.log(ex);
    });
  }

  openDialog() {
    this.visible = true;
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    this.minDate = this.datePipe.transform(currentDate, 'yyyy-MM-ddTHH:mm');
    console.log(this.minDate);
  }


  accepter(event: any) {
    this.confirmationService.confirm({
      target: event.target,
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      message: 'Vous etes sur d\'accepter cette candidature?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.invitation.participation = this.participationResult.participation;
        this.invitation.etat = true;
        this.invitationService.addInvit(this.invitation).subscribe(res => {
          this.toastService.success(res.message, res.detail);
          this.visible = false;
          this.showFooter = false;
        }, ex => {
          this.toastService.error('Erreur', 'Opération non effectuée');
          console.log(ex);
        });
      }
    });

  }

  rejeter(event: any) {
    this.confirmationService.confirm({
      target: event.target,
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      message: 'Vous etes sur de rejeter cette candidature?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.invitation.participation = this.participationResult.participation;
        this.invitation.etat = false;
        this.invitationService.addInvit(this.invitation).subscribe(res => {
          this.toastService.success(res.message, res.detail);
          this.showFooter = false;
        }, ex => {
          this.toastService.error('Erreur', 'Opération non effectuée');
          console.log(ex);
        });
      }
    });
  }
}
