import { Component, OnInit } from '@angular/core';
import {ParticipationService} from "../../../shared/services/participation.service";

@Component({
  selector: 'app-participation-entreprise',
  templateUrl: './participation-entreprise.component.html',
  styleUrls: ['./participation-entreprise.component.scss']
})
export class ParticipationEntrepriseComponent implements OnInit {


  participations:any[];

  constructor(private participationService: ParticipationService) { }

  ngOnInit(): void {

    this.getAll()
  }
  getAll() {
    this.participationService.getAll().subscribe(data => {
      console.log(data);
      this.participations = data;
    }, ex => console.log(ex));
  }


}
