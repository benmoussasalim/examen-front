import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {QuestionComponent} from "./question/question.component";
import {NewQuestionComponent} from "./question/new-question/new-question.component";
import {ReponseComponent} from "./question/reponse/reponse.component";
import {ExamenComponent} from "./examen/examen.component";
import {NewExamenComponent} from "./examen/new-examen/new-examen.component";
import {AdminGuard} from "../shared/guards/admin.guard";
import {EntrepriseGuard} from "../shared/guards/entreprise.guard";
import {CandidatGuard} from "../shared/guards/candidat.guard";
import {ExamenNotExpiredComponent} from "./examen-not-expired/examen-not-expired.component";
import {ParticipationComponent} from "./participation/participation.component";
import {ResultComponent} from "./participation/result/result.component";
import {ParticipationCandidatComponent} from "./participation/participation-candidat/participation-candidat.component";
import {ParticipationEntrepriseComponent} from "./participation/participation-entreprise/participation-entreprise.component";
import {MeetComponent} from "./participation/meet/meet.component";

const routes: Routes = [
  {path: 'question', component: QuestionComponent, canActivate: [AdminGuard]},
  {path: 'question/new', component: NewQuestionComponent, canActivate: [AdminGuard]},
  {path: 'question/edit/:id', component: NewQuestionComponent, canActivate: [AdminGuard]},
  {path: 'question/questionbytheme/:id', component: QuestionComponent, canActivate: [AdminGuard]},
  {path: 'question/reponse/:id', component: ReponseComponent, canActivate: [AdminGuard]},
  {path: 'examen', component: ExamenComponent, canActivate: [EntrepriseGuard]},
  {path: 'examen/new', component: NewExamenComponent, canActivate: [EntrepriseGuard]},
  {path: 'examen/edit/:id', component: NewExamenComponent, canActivate: [EntrepriseGuard]},
  {path: 'examen/not-expired', component: ExamenNotExpiredComponent , canActivate: [CandidatGuard]},
  {path: 'examen/participation/:id', component: ParticipationComponent , canActivate: [CandidatGuard],},
  {path: 'examen/participation/:idExam/result', component: ResultComponent , canActivate: [CandidatGuard],},
  {path: 'participation-candidat', component: ParticipationCandidatComponent , canActivate: [CandidatGuard]},
  {path: 'participation-entreprise', component: ParticipationEntrepriseComponent , canActivate: [EntrepriseGuard]},
  {path: 'participation/result/:idExam/:idCandidat', component: ResultComponent , canActivate: [EntrepriseGuard],},
  {path: 'meet/:room', component: MeetComponent },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FeaturesRoutingModule {

}
