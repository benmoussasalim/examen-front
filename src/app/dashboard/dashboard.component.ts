import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../shared/services/dashboard.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dataEtatEntreprise: any;
  dataEtatCandidat: any;
  dataExamenQuestion: any;
  dataExamenParticipation: any;
  dataInvitation: any;
  dataMention: any;
  chartOptions: any;

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit(): void {


    this.chartOptions = {
      responsive: true,
      tooltips: {
        mode: 'index',
        intersect: true
      },
      scales: {
        yAxes: [{

          ticks: {
            beginAtZero: true,
            precision: false
          }
        }]
      }
    };
    const token = localStorage.getItem('token');
    const jwtHelper = new JwtHelperService();

    if (token && !jwtHelper.isTokenExpired(token)) {
      const decodedToken = jwtHelper.decodeToken(token);
      const roles = decodedToken.roles;
      if (roles.includes('ROLE_ADMIN')) {
        this.etatByEntreprise();
        this.etatByCandidat();
        this.questionExamenByTheme();
      }
      else if (roles.includes('ROLE_ENTREPRISE')) {
        this.examenParticipation();
        this.invitationEntreprise();
        this.mentionEntreprise();
      }
      else if (roles.includes('ROLE_CANDIDAT')) {
        this.invitationCandidat();
        this.mentionCandidat();
      }
    }
  }

  etatByEntreprise(): void {
    this.dashboardService.getByEntreprise().subscribe(res => {
      this.dataEtatEntreprise = {
        labels: res.labels,
        datasets: [
          {
            data: res.values1,
            backgroundColor: [
              "#36A2EB",
              "#FF6384",

            ],
            hoverBackgroundColor: [
              "#36A2EB",
              "#FF6384",


            ]
          }]
      };
    }, ex => console.log(ex));
  }


  etatByCandidat(): void {
    this.dashboardService.getByCandidat().subscribe(res => {
      this.dataEtatCandidat = {
        labels: res.labels,
        datasets: [
          {
            data: res.values1,
            backgroundColor: [
              "#36A2EB",
              "#FF6384",

            ],
            hoverBackgroundColor: [
              "#36A2EB",
              "#FF6384",


            ]
          }]
      };
    }, ex => console.log(ex));
  }

  private questionExamenByTheme() {
    this.dashboardService.getByTheme().subscribe(res => {
      this.dataExamenQuestion = {
        labels: res.labels,
        datasets: [
          {
            label: 'Question',
            backgroundColor: '#42A5F5',
            data: res.values1
          },
          {
            label: 'Examen',
            backgroundColor: '#FFA726',
            data: res.values2
          }
        ]
      };
    }, ex => console.log(ex));

  }

  private examenParticipation() {
    const id = JSON.parse(localStorage.getItem('currentUser')!).id;
    this.dashboardService.getByThemeEntreprise(id).subscribe(res => {
      this.dataExamenParticipation = {
        labels: res.labels,
        datasets: [
          {
            label: 'Examen',
            backgroundColor: '#66BB6A',
            data: res.values1
          },
          {
            label: 'Participation',
            backgroundColor: '#FFA726',
            data: res.values2
          },
          {
            type: 'line',
            label: 'Invitation',
            borderColor: '#42A5F5',
            borderWidth: 2,
            fill: false,
            data: res.values3
          }
        ]
      };
    }, ex => console.log(ex));
  }

  private invitationEntreprise() {
    const id = JSON.parse(localStorage.getItem('currentUser')!).id;
    this.dashboardService.getByInvitationEntreprise(id).subscribe(res => {
      this.dataInvitation = {
        labels: res.labels,
        datasets: [
          {
            data: res.values1,
            backgroundColor: [
              "#36A2EB",
              "#FF6384",
              "#FFCE56"

            ],
            hoverBackgroundColor: [
              "#36A2EB",
              "#FF6384",
              "#FFCE56"

            ]
          }]
      };
    }, ex => console.log(ex));

  }

  private mentionEntreprise() {
    const id = JSON.parse(localStorage.getItem('currentUser')!).id;
    this.dashboardService.getByMentionEntreprise(id).subscribe(res => {
      this.dataMention = {
        labels: res.labels,
        datasets: [
          {
            data: res.values1,
            backgroundColor: [
              "#f4251b",
              "#fba72c",
              "#a6db29",
              "#07115c",
              "#2d5fd1",
              "#8632e3"
            ],
            hoverBackgroundColor: [
              "#f4251b",
              "#fba72c",
              "#a6db29",
              "#07115c",
              "#2d5fd1",
              "#8632e3"
            ]
          }]
      };
    }, ex => console.log(ex));
  }



  private invitationCandidat() {
    const id = JSON.parse(localStorage.getItem('currentUser')!).id;
    this.dashboardService.getByInvitationCandidat(id).subscribe(res => {

      this.dataInvitation = {
        labels: res.labels,
        datasets: [
          {
            data: res.values1,
            backgroundColor: [
              "#36A2EB",
              "#FF6384",
              "#FFCE56"

            ],
            hoverBackgroundColor: [
              "#36A2EB",
              "#FF6384",
              "#FFCE56"

            ]
          }]
      };
    }, ex => console.log(ex));

  }

  private mentionCandidat() {
    const id = JSON.parse(localStorage.getItem('currentUser')!).id;
    this.dashboardService.getByMentionCandidat(id).subscribe(res => {
      this.dataMention = {
        labels: res.labels,
        datasets: [
          {
            data: res.values1,
            backgroundColor: [
              "#f4251b",
              "#fba72c",
              "#a6db29",
              "#07115c",
              "#2d5fd1",
              "#8632e3"
            ],
            hoverBackgroundColor: [
              "#f4251b",
              "#fba72c",
              "#a6db29",
              "#07115c",
              "#2d5fd1",
              "#8632e3"
            ]
          }]
      };
    }, ex => console.log(ex));
  }
}
