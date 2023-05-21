import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime } from 'rxjs';
import { TypeModelSingle } from 'src/app/shared/models/models';

import { UserService } from '../../services/user.service';
import { SearchUserDialogComponent } from '../search-user-dialog/search-user-dialog.component';
import { FeedbackService } from './../../../shared/services/feedback.service';
import { TypeService } from './../../../shared/services/type.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss'],
})
export class UserPanelComponent {
  constructor(
    private feedback: FeedbackService,
    private typeService: TypeService,
    private translateService: TranslateService,
    private userService: UserService,
    private form: FormBuilder,
    private dialog: MatDialog
  ) {}

  totalLength!: number;
  pageSize = 10;
  page = 0;

  filterControl = new FormControl('');
  asc = new FormControl(false);
  sortBy = new FormControl('');
  loadingPage: boolean = true;
  // Lista de usuarios
  users: any[] = [];
  // Options
  listRegion: TypeModelSingle[] = [];
  listLocation: TypeModelSingle[] = [];

  // searchForm
  searchForm = this.form.group({
    idLocationType: [],
    idRegionType: [],
    latitudeMax: [],
    latitudeMin: [],
    longitudeMax: [],
    longitudeMin: [],
  });

  ngOnInit(): void {
    this.typeService.updateListRegion().subscribe({
      next: (response) => {
        this.listRegion = response;
      },
    });

    this.typeService.updateListLocation().subscribe({
      next: (response) => {
        this.listLocation = response;
      },
    });

    this.filterControl.valueChanges.pipe(debounceTime(1000)).subscribe(() => {
      this.loadingPage = true;
      this.userService
        .findAllPaginated(
          {
            pageIndex: this.page,
            pageSize: this.pageSize,
            length: this.totalLength,
          },
          {
            field: this.sortBy.value,
            asc: this.asc.value,
          },
          this.filterControl.value
        )
        .subscribe((response) => {
          this.users = response.content;
          this.loadingPage = false;
        });
    });
    this.pageChange({
      pageIndex: this.page,
      pageSize: this.pageSize,
      length: this.totalLength,
    });
  }

  pageChange(pageEvent: PageEvent) {
    this.loadingPage = true;
    this.userService
      .findAllPaginated(
        pageEvent,
        { field: this.sortBy.value, asc: this.asc.value },
        this.filterControl.value,
        this.searchForm.value
      )
      .subscribe({
        next: (response) => {
          this.users = response.content;
          this.loadingPage = false;
          this.totalLength = response.totalElements;
          this.pageSize = response.size;
          this.page = pageEvent.pageIndex;
        },
        error: () => this.feedback.showMessage('general.cantLoad'),
      });
  }

  getStateAbreviationById(id: number) {
    return this.typeService.getStateAbreviationById(id);
  }

  searchUser() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; // Permite que ESC ou clicar fora da caixa feche o dialog
    dialogConfig.autoFocus = true; // True, meaning that the focus will be set automatically on the first form field of the dialog
    dialogConfig.width = '75%';
    dialogConfig.data = this.searchForm;
    let dialogRef = this.dialog.open(SearchUserDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((res) => {
      this.loadingPage = false;
      if (res) {
        this.searchForm.patchValue(res); // atualiza o formulario de pesquisa

        this.userService
          .findAllPaginated(
            {
              pageIndex: this.page,
              pageSize: this.pageSize,
              length: this.totalLength,
            },
            {
              field: this.sortBy.value,
              asc: this.asc.value,
            },
            this.filterControl.value,
            this.searchForm.value
          )
          .subscribe((response) => {
            this.users = response.content;
            this.loadingPage = false;
          });
      }
    });
  }

  // Para ajudar no desenvolvimento
  seeData() {
    console.log('searchForm');
    console.log(this.searchForm.value);
  }
}
