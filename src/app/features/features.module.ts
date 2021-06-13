import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question/question.component';
import {SharedModule} from "../shared/shared.module";
import {FeaturesRoutingModule} from "./features-routing.module";
import { NewQuestionComponent } from './question/new-question/new-question.component';
import { ReponseComponent } from './question/reponse/reponse.component';
import { ExamenComponent } from './examen/examen.component';
import { NewExamenComponent } from './examen/new-examen/new-examen.component';
import { ExamenNotExpiredComponent } from './examen-not-expired/examen-not-expired.component';
import { ParticipationComponent } from './participation/participation.component';
import { ResultComponent } from './participation/result/result.component';
import { ParticipationCandidatComponent } from './participation/participation-candidat/participation-candidat.component';
import { ParticipationEntrepriseComponent } from './participation/participation-entreprise/participation-entreprise.component';
import { MeetComponent } from './participation/meet/meet.component';



@NgModule({
  declarations: [
    QuestionComponent,
    NewQuestionComponent,
    ReponseComponent,
    ExamenComponent,
    NewExamenComponent,
    ExamenNotExpiredComponent,
    ParticipationComponent,
    ResultComponent,
    ParticipationCandidatComponent,
    ParticipationEntrepriseComponent,
    MeetComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FeaturesRoutingModule
  ]
})
export class FeaturesModule { }
