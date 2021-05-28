import {Component, OnInit, ViewChild} from '@angular/core';
import {CandidatService} from "../../shared/services/candidat.service";
import {EntrepriseService} from "../../shared/services/entreprise.service";
import {ToastService} from "../../shared/services/toast.service";
import {Candidat} from "../../shared/model/candidat";
import {Entreprise} from "../../shared/model/entreprise";
import {UserService} from "../../shared/services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  candidat = new Candidat();
  entreprise = new Entreprise();
  filesName: any = ['Choisir image'];
  selectedFiles: FileList;
  id: any;
  images: any[];
  @ViewChild('inputFile') inputFile: any;

  constructor(private candidatService: CandidatService,
              private entrepriseService: EntrepriseService,
              private toastService: ToastService,
              private  userService: UserService,) {
  }

  ngOnInit(): void {
    this.candidat = JSON.parse(localStorage.getItem('currentUser')!);
    this.entreprise = JSON.parse(localStorage.getItem('currentUser')!);
    this.id = JSON.parse(localStorage.getItem('currentUser')!).id;
  }

  annuler(): void {
    this.candidat = JSON.parse(localStorage.getItem('currentUser')!);
    this.entreprise = JSON.parse(localStorage.getItem('currentUser')!);

  }

  updateCandidat() {
    this.candidatService.updateCandidat(this.candidat).subscribe(res => {
        if (res.success) {
          this.toastService.success(res.message, res.detail);
          localStorage.setItem('currentUser', JSON.stringify(this.candidat));
          location.reload();
        } else {
          this.toastService.warning(res.message, res.detail);
        }
      }, ex => {
        this.toastService.error('Erreur', 'Opération non effectuée');
        console.log(ex);
      }
    );
  }

  updateEntreprise() {
    this.entrepriseService.updateEntreprise(this.entreprise).subscribe(res => {
        if (res.success) {
          this.toastService.success(res.message, res.detail);
          localStorage.setItem('currentUser', JSON.stringify(this.entreprise));
          location.reload();
        } else {
          this.toastService.warning(res.message, res.detail);
        }
      }, ex => {
        this.toastService.error('Erreur', 'Opération non effectuée');
        console.log(ex);
      }
    );


  }


  selectFile(event: any) {
    this.selectedFiles = event.target.files;
    this.filesName = [...event.target.files].map(file => file.name);

    const formData = new FormData();


      formData.append('file', this.selectedFiles[0]);

    this.userService.upload(formData, this.id).subscribe(res => {
      if (res.success) {

        const user = JSON.parse(localStorage.getItem('currentUser')!);
        console.log(this.selectedFiles[0]);
        user.image = this.selectedFiles[0].name;
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.inputFile.nativeElement.value = '';
        this.filesName = ['Choisir image'];
        this.toastService.success(res.message, res.detail);
        location.reload();
      } else {
        this.toastService.warning(res.message, res.detail);
      }
    }, ex => {
      this.toastService.error('Erreur', 'Opération non effectuée');
      console.log(ex);
    });
  }


}
