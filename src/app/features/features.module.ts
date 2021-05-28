import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question/question.component';
import {SharedModule} from "../shared/shared.module";
import {FeaturesRoutingModule} from "./features-routing.module";
import { NewQuestionComponent } from './question/new-question/new-question.component';
import { ReponseComponent } from './question/reponse/reponse.component';
import { ExamenComponent } from './examen/examen.component';
import { NewExamenComponent } from './examen/new-examen/new-examen.component';



@NgModule({
  declarations: [
    QuestionComponent,
    NewQuestionComponent,
    ReponseComponent,
    ExamenComponent,
    NewExamenComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FeaturesRoutingModule
  ]
})
export class FeaturesModule { }
