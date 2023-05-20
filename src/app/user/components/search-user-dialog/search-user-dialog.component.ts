import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { TypeModelDual } from 'src/app/shared/models/models';
import { TypeService } from 'src/app/shared/services/type.service';

@Component({
  selector: 'app-search-user-dialog',
  templateUrl: './search-user-dialog.component.html',
  styleUrls: ['./search-user-dialog.component.scss']
})
export class SearchUserDialogComponent {
  constructor(
    private typeService: TypeService,
    private form: FormBuilder,
    private dialogRef: MatDialogRef<SearchUserDialogComponent>,
    private translateService: TranslateService,
    @Inject (MAT_DIALOG_DATA) data: any){
      this.searchForm.patchValue({
        orderStatus: data.value.orderStatus,
        idOrder: data.value.idOrder,
        idCustomer: data.value.idCustomer,
        firstName: data.value.firstName,
        lastName: data.value.lastName,
        email: data.value.email,
        cpf: data.value.cpf,
      })
    }

  searchForm = this.form.group({
    orderStatus: [],
    idOrder: [],
    idCustomer: [],
    firstName: [],
    lastName: [],
    email: [],
    cpf: [],
  });

  // Opções para selecionar
  listLocation: TypeModelDual [] = []; //  Tipo de localizaçao = Especial/Normal/Trabalhoso
  listRegion: TypeModelDual [] = []; //  Regiao = Norte/Nordeste/Centro-Oeste/Sudeste/Sul


  ngOnInit(): void {
    // Pegar lista de opções para filtrar
    this.typeService.updateListLocation().subscribe({
      next: (response) =>{
       this.listLocation = response;
      }
    });
    this.typeService.updateListRegion().subscribe({
      next: (response) =>{
       this.listRegion = response;
      }
    });

  }

  save() {
    this.dialogRef.close(this.searchForm.value);
  }

  close() {
    this.dialogRef.close();
  }


}
