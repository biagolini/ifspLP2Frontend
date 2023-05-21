import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TypeModelSingle } from 'src/app/shared/models/models';
import { TypeService } from 'src/app/shared/services/type.service';

@Component({
  selector: 'app-search-user-dialog',
  templateUrl: './search-user-dialog.component.html',
  styleUrls: ['./search-user-dialog.component.scss'],
})
export class SearchUserDialogComponent {
  constructor(
    private typeService: TypeService,
    private form: FormBuilder,
    private dialogRef: MatDialogRef<SearchUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.searchForm.patchValue({
      idLocationType: data.value.idLocationType,
      idRegionType: data.value.idRegionType,
      latitudeMax: data.value.latitudeMax,
      latitudeMin: data.value.latitudeMin,
      longitudeMax: data.value.longitudeMax,
      longitudeMin: data.value.longitudeMin,
    });
  }

  searchForm = this.form.group({
    idLocationType: [],
    idRegionType: [],
    latitudeMax: [],
    latitudeMin: [],
    longitudeMax: [],
    longitudeMin: [],
  });

  // Opções para selecionar
  listLocation: TypeModelSingle[] = []; //  Tipo de localizaçao = Especial/Normal/Trabalhoso
  listRegion: TypeModelSingle[] = []; //  Regiao = Norte/Nordeste/Centro-Oeste/Sudeste/Sul

  ngOnInit(): void {
    // Pegar lista de opções para filtrar
    this.typeService.fillTypesIfEmpty().then(() => {
      this.listLocation = this.typeService.listLocation;
      this.listRegion = this.typeService.listRegion;
    });
  }

  save() {
    this.dialogRef.close(this.searchForm.value);
  }

  close() {
    this.dialogRef.close();
  }

  // Para ajudar no desenvolvimento
  seeData() {
    console.log('searchForm');
    console.log(this.searchForm.value);
  }
}
