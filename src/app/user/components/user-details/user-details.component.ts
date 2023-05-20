
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { TypeService } from 'src/app/shared/services/type.service';
import { TypeModelDual } from 'src/app/shared/models/models';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {

  constructor(
    private form: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private feedback: FeedbackService,
    private router: Router,
    private typeService: TypeService,
  ) {}

  isEdit = false;
  userId!: number;
  processing: boolean = false;

  // Options
  listState: TypeModelDual [] = []; //  Lista de estados e seus codigos

  userForm = this.form.group({
    // Sobre a pessoa
    title: [''],
    idTypeGender: [''],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    birthday: ['', Validators.required],
    idTypeNationality: [''],
    idTypeTimezone: [''],
    // Sobre sua localizacao
    street: ['', Validators.required],
    city: ['', Validators.required],
    idTypeState: ['', Validators.required],
    postcode: ['', Validators.required],
    idLocationType: [''],
    idRegionType: [''],
    latitude: [''],
    longitude: [''],
    thumbnailUrl: [''],
  });


  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        this.isEdit = params['id'] !== 'new';
        this.userId = params['id'];
      },
    });
      // Pegar lista atualizada de estados
      this.typeService.updateListState().subscribe({
      next: (response) =>{
        this.listState = response;
      }
    });

    if (this.isEdit) {
      this.patchUser();
    }
  }

  patchUser(){
    this.userService.getUserById(this.userId).subscribe({
      next: (response) =>{
        this.userForm.patchValue(response);
        console.log(response)
      }
    });

  }

  formatForm(){
    // Verifique se a propriedade birthday existe e se ela possui um valor
    if (this.userForm.value.hasOwnProperty('birthday') && this.userForm.value.birthday) {
      let formattedDt = formatDate(this.userForm.value.birthday, 'yyyy-MM-dd', 'en_US');
      this.userForm.patchValue({birthday: formattedDt});
    }
    // Verifique se a propriedade postcode existe, se ela possui um valor e se o comprimento do valor é 9
    if(this.userForm.value.hasOwnProperty('postcode') && this.userForm.value.postcode && this.userForm.value.postcode.length == 9){
      let arrayElements = this.userForm.value.postcode;

      // Verifique se 'arrayElements' não é null ou undefined antes de usar substring
      if (arrayElements) {
        arrayElements = arrayElements.substring(0, 5) + arrayElements.substring(6, arrayElements.length);
        this.userForm.patchValue({postcode: arrayElements});
      }
    }
  }

 saveUser() {
    this.formatForm();
    const data = this.userForm.value;
    this.userService.createUser(data).subscribe({
      next: () => {
        this.feedback.showMessage('user.success.created').subscribe();
        this.router.navigate(['/user']);
      },
      error: error => {
        this.feedback.showMessage('user.error.created').subscribe();
      }
    });
  }

  createUser() {
    this.formatForm();
    const data = this.userForm.value;
    this.userService.updateUser(data, this.userId).subscribe({
      next: () => {
        this.feedback.showMessage('user.success.updated').subscribe();
        this.router.navigate(['/user']);
      },
      error: () => {
        this.feedback.showMessage('user.error.updated').subscribe();
      }
    });
  }
      // Para ajudar no desenvolvimento
      seeData(){
        console.log( "Dados que estão sendo trabalhados");
        console.log(this.userForm.value);
      }
}
