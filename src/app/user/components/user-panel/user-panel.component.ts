import { TranslateService } from '@ngx-translate/core';
import { FeedbackService } from './../../../shared/services/feedback.service';
import { TypeService } from './../../../shared/services/type.service';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TypeModelSingle } from 'src/app/shared/models/models';
import { PageEvent } from '@angular/material/paginator';
import { debounceTime } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent {

  constructor(

    private feedback: FeedbackService,
    private typeService: TypeService,
    private translateService: TranslateService,
    private userService: UserService,
    ) {  }

    totalLength!: number;
    pageSize = 10;
    page = 0;


    filterControl = new FormControl('');
    asc = new FormControl(false);
    sortBy = new FormControl('');
    loadingPage:boolean = true;
    // Lista de usuarios
    users: any[] = [];
    // Options
    listRegion : TypeModelSingle[] = [];
    listLocation : TypeModelSingle[] = [];


    ngOnInit(): void {
        this.typeService.updateListRegion().subscribe({
          next: (response) =>{
            this.listRegion = response;
          }

        });

        this.typeService.updateListLocation().subscribe({
          next: (response) =>{
            this.listLocation = response;
          }
        });

      this.filterControl.valueChanges.pipe(debounceTime(1000)).subscribe( () => {
        this.loadingPage = true;
        this.userService.findAllPaginated({
          pageIndex: this.page,
          pageSize: this.pageSize,
          length: this.totalLength,
        },
        {field: this.sortBy.value, asc: this.asc.value},
        this.filterControl.value
       ).subscribe(response => {
          this.users = response.content;
          this.loadingPage = false;
        }
        );
      })
        this.pageChange({
        pageIndex: this.page,
        pageSize: this.pageSize,
        length: this.totalLength,
      });

    }

    pageChange(pageEvent: PageEvent) {
      this.loadingPage = true;
      this.userService.findAllPaginated(
        pageEvent,
        {field: this.sortBy.value, asc: this.asc.value},
        this.filterControl.value
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

    getImage(){
      console.log( "a");
      console.log(this.users);



    }

    getStateAbreviationById(id:number){
      return this.typeService.getStateAbreviationById(id);
    }



  }
