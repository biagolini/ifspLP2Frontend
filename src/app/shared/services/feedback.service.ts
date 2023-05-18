import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, of } from 'rxjs';
import { concatMap } from 'rxjs/operators';

import { RequestConfirmDialogComponent } from '../components/request-confirm-dialog/request-confirm-dialog.component';


export interface JustifyResult{
  confirm: boolean,
  comments: string
}


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(
    private translateService: TranslateService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  showMessage(message: string) {
    return this.translateService.get(message).pipe(
      concatMap((messageTranslation: string) => {
        return combineLatest([
          of(messageTranslation),
          this.translateService.get('general.close'),
        ]);
      }),
      concatMap(([messageTranslation, closeTranslation]: string[]) => {
        return this.snackBar
        .open(messageTranslation, closeTranslation, {
          duration: 5000,
          panelClass: ['snackbar'],
        })
        .afterDismissed();
      })
    );
  }

  requestConfirm(message: string, param: any,callback: (result: JustifyResult) => void){
    this.dialog.open(RequestConfirmDialogComponent,{ width: '500px', data: {message,param}})
    .afterClosed()
    .subscribe(callback);
  }

}
