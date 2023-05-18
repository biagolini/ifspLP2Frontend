import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { UserRoutingModule } from './user-routing.module';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { SearchUserDialogComponent } from './components/search-user-dialog/search-user-dialog.component';


@NgModule({
  declarations: [
    UserDetailsComponent,
    UserPanelComponent,
    SearchUserDialogComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule

  ]
})
export class UserModule { }
