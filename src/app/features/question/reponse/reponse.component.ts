import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ReponseService} from "../../../shared/services/reponse.service";
import {Reponse} from "../../../shared/model/reponse";
import {Question} from "../../../shared/model/question";
import {QuestionService} from "../../../shared/services/question.service";
import {ToastService} from "../../../shared/services/toast.service";

@Component({
  selector: 'app-reponse',
  templateUrl: './reponse.component.html',
  styleUrls: ['./reponse.component.scss']
})
export class ReponseComponent implements OnInit {
  idQuestion: any;
  reponses: Reponse[];
  question = new Question();

  constructor(private activatedRoute: ActivatedRoute,
              private reponseService: ReponseService,
              private questionService: QuestionService,
              private toastService: ToastService,
              private router: Router) {
  }

  ngOnInit(): void {


    this.getByIdQuestion();
  }

  getByIdQuestion(): void {
    this.reponses = [];
    this.idQuestion = this.activatedRoute.snapshot.paramMap.get('id');
    this.questionService.questionById(this.idQuestion).subscribe(res => {
      this.question = res;
      this.reponseService.getByQuestion(this.idQuestion).subscribe(data => {
        if (data.length > 0) {
          this.reponses = data;
        } else {
          console.log('*******************');
          const rep1 = new Reponse();
          rep1.question = this.question;
          rep1.correct = false;
          const rep2 = new Reponse();
          rep2.question = this.question;
          rep2.correct = false;
          this.reponses.push(rep1);
          this.reponses.push(rep2);
        }
      });
    }, ex => console.log(ex));
  }

  clickAdd(): void {
    const rep = new Reponse();
    rep.question = this.question;
    rep.correct = false;
    this.reponses.push(rep);
  }

  removeReponse(index: any, id: number) {
    if (index > -1) {
      if (id) {
        this.reponseService.deleteReponse(id).subscribe(res => {
          if (res.success) {
            this.toastService.success(res.message, res.detail);
            this.reponses.splice(index, 1);
          } else {
            this.toastService.warning(res.message, res.detail);
          }
        }, ex => {
          this.toastService.error('Erreur', 'Opération non effectuée');
          console.log(ex);
        });
      } else {
        this.reponses.splice(index, 1);
      }

    }
  }

  annuler() {

    this.getByIdQuestion();

  }

  addReponses() {
    const exist = this.reponses.find(rep => rep.correct === true);
    if (exist) {
      this.reponseService.addReponse(this.reponses).subscribe(res => {
        if (res.success) {
          this.toastService.success(res.message, res.detail);
          // this.router.navigate(['/app/features/question']);
        } else {
          this.toastService.warning(res.message, res.detail);
        }
      }, ex => {
        this.toastService.error('Erreur', 'Opération non effectuée');
        console.log(ex);
      });
    } else {
      this.toastService.warning('Attention', 'Une réponse correcte au minimum');
    }
  }

  checkSingle(reponse: Reponse): void {

    this.reponses = this.reponses.map(resp => {

      resp.correct = false;
      return resp;
    });
    reponse.correct = true;
  }
}
