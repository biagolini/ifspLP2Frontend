import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  TypeModelDual,
  TypeModelSingle,
  TypeState,
  TypeTimeZone,
} from 'src/app/shared/models/models';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import { TypeService } from 'src/app/shared/services/type.service';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent {
  constructor(
    private form: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private feedback: FeedbackService,
    private router: Router,
    private typeService: TypeService
  ) {}

  // XXX
  isEdit = false;
  userId!: number;
  processing: boolean = false;

  // Options
  listGender: TypeModelSingle[] = [];
  listLocation: TypeModelSingle[] = [];
  listLogin: TypeModelSingle[] = [];
  listPhoneNumber: TypeModelSingle[] = [];
  listRegion: TypeModelSingle[] = [];
  listState: TypeState[] = [];
  listTimeZone: TypeTimeZone[] = [];

  // Formulario
  userForm = this.form.group({
    // About user location
    idTypeGender: [''],
    title: [''],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    birthday: ['', Validators.required],
    idTypeTimezone: [''],
    // About user location
    street: ['', Validators.required],
    city: ['', Validators.required],
    idTypeState: ['', Validators.required],
    postcode: ['', Validators.required],
    idLocationType: [{ value: '', disabled: true }],
    idRegionType: [{ value: '', disabled: true }],
    latitude: [''],
    longitude: [''],
    // About our system
    registered: [''],
    thumbnailUrl: [''],
  });

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        this.isEdit = params['id'] !== 'new';
        this.userId = params['id'];
      },
    });

    this.typeService.fillTypesIfEmpty().then(() => {
      this.listGender = this.typeService.listGender;
      this.listLocation = this.typeService.listLocation;
      this.listLogin = this.typeService.listLogin;
      this.listPhoneNumber = this.typeService.listPhoneNumber;
      this.listRegion = this.typeService.listRegion;
      this.listState = this.typeService.listState;
      this.listTimeZone = this.typeService.listTimeZone;
    });

    if (this.isEdit) {
      this.patchUser();
    }
  }

  patchUser() {
    this.userService.getUserById(this.userId).subscribe({
      next: (response) => {
        this.userForm.patchValue(response);
        console.log(response);
      },
    });
  }

  formatForm() {
    // Verifique se a propriedade birthday existe e se ela possui um valor
    if (
      this.userForm.value.hasOwnProperty('birthday') &&
      this.userForm.value.birthday
    ) {
      let formattedDt = formatDate(
        this.userForm.value.birthday,
        'yyyy-MM-dd',
        'en_US'
      );
      let formattedDtWithTime = formattedDt + 'T00:00:00'; // Adiciona o horário
      this.userForm.patchValue({ birthday: formattedDtWithTime });
    }
    // Verifique se a propriedade postcode existe, se ela possui um valor e se o comprimento do valor é 9
    if (
      this.userForm.value.hasOwnProperty('postcode') &&
      this.userForm.value.postcode &&
      this.userForm.value.postcode.length == 9
    ) {
      let arrayElements = this.userForm.value.postcode;
      // Verifique se 'arrayElements' não é null ou undefined antes de usar substring
      if (arrayElements) {
        arrayElements =
          arrayElements.substring(0, 5) +
          arrayElements.substring(6, arrayElements.length);
        this.userForm.patchValue({ postcode: arrayElements });
      }
    }
  }

  saveUser() {
    this.formatForm();
    const data = this.userForm.value;
    console.log('saveUser');
    console.log(data);
    this.userService.updateUser(data, this.userId).subscribe({
      next: () => {
        console.log('SUCESSO NO SALVAMENTO');
        this.feedback.showMessage('user.success.created').subscribe();
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log('ERRO NO SALVAMENTO');
        this.feedback.showMessage('user.error.created').subscribe();
      },
    });
  }

  createUser() {
    this.formatForm();
    const data = this.userForm.value;
    console.log('createUser');
    console.log(data);
    this.userService.createUser(data).subscribe({
      next: () => {
        this.feedback.showMessage('user.success.updated').subscribe();
        this.router.navigate(['/']);
      },
      error: () => {
        this.feedback.showMessage('user.error.updated').subscribe();
      },
    });
  }
}
