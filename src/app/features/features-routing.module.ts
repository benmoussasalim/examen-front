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
import {ParticipationComponent} from "./examen-not-expired/participation/participation.component";

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
  {path: 'examen/not-expired/participation/:id', component: ParticipationComponent , canActivate: [CandidatGuard]},

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FeaturesRoutingModule {

}
