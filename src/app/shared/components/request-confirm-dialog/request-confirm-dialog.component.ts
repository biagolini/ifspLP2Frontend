import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-request-confirm-dialog',
  templateUrl: './request-confirm-dialog.component.html',
  styleUrls: ['./request-confirm-dialog.component.scss']
})
export class RequestConfirmDialogComponent {
  message = '';
  param: any;

  constructor(@Inject(MAT_DIALOG_DATA) data: {message: string,param: any}) {
    this.message = data.message;
    this.param = data.param;
  }

}
