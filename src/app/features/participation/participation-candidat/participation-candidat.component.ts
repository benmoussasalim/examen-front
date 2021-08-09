import { Component, OnInit } from '@angular/core';
import {ParticipationService} from "../../../shared/services/participation.service";

@Component({
  selector: 'app-participations',
  templateUrl: './participation-candidat.component.html',
  styleUrls: ['./participation-candidat.component.scss']
})
export class ParticipationCandidatComponent implements OnInit {
idCandidat:any;
participations:any[];
participation:any;
  constructor(private participationService: ParticipationService) { }

  ngOnInit(): void {
    this.idCandidat = JSON.parse(localStorage.getItem('currentUser')!).id;
    this.getAll()
  }
  getAll() {
    this.participationService.getByCandidat(this.idCandidat).subscribe(data => {
      console.log(data);
      this.participations = data;
    }, ex => console.log(ex));
  }

}
