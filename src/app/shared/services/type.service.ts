import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import {
  TypeModelDual,
  TypeModelSingle,
  TypeTimeZone,
} from './../models/models';

@Injectable({
  providedIn: 'root',
})
export class TypeService {
  constructor(private http: HttpClient) {}
  public listGender: TypeModelSingle[] = [];
  public listLocation: TypeModelSingle[] = [];
  public listLogin: TypeModelSingle[] = [];
  public listNationality: TypeModelDual[] = [];
  public listPhoneNumber: TypeModelSingle[] = [];
  public listRegion: TypeModelSingle[] = [];
  public listState: TypeModelDual[] = [];
  public listTimeZone: TypeTimeZone[] = [];

  updateListGender() {
    return this.http
      .get<any>(`${environment.apiUrl}/types/getGender`)
      .pipe(take(1));
  }

  updateListLocation() {
    return this.http
      .get<any>(`${environment.apiUrl}/types/getLocation`)
      .pipe(take(1));
  }

  updateListLogin() {
    return this.http
      .get<any>(`${environment.apiUrl}/types/getLogin`)
      .pipe(take(1));
  }

  updateListNationality() {
    return this.http
      .get<any>(`${environment.apiUrl}/types/getNationality`)
      .pipe(take(1));
  }

  updateListPhoneNumber() {
    return this.http
      .get<any>(`${environment.apiUrl}/types/getPhoneNumber`)
      .pipe(take(1));
  }

  updateListRegion() {
    return this.http
      .get<any>(`${environment.apiUrl}/types/getRegion`)
      .pipe(take(1));
  }

  updateListState() {
    return this.http
      .get<any>(`${environment.apiUrl}/types/getState`)
      .pipe(take(1));
  }

  updateListTimeZone() {
    return this.http
      .get<any>(`${environment.apiUrl}/types/getTimeZone`)
      .pipe(take(1));
  }

  async fillTypesIfEmpty(): Promise<void> {
    if (this.listsAreNotEmpty()) {
      return;
    }

    if (this.listGender.length === 0) {
      const genderList = await this.updateListGender().toPromise();
      this.listGender = genderList;
    }

    if (this.listLocation.length === 0) {
      const locationList = await this.updateListLocation().toPromise();
      this.listLocation = locationList;
    }

    if (this.listLogin.length === 0) {
      const loginList = await this.updateListLogin().toPromise();
      this.listLogin = loginList;
    }

    if (this.listNationality.length === 0) {
      const nationalityList = await this.updateListNationality().toPromise();
      this.listNationality = nationalityList;
    }

    if (this.listPhoneNumber.length === 0) {
      const phoneNumberList = await this.updateListPhoneNumber().toPromise();
      this.listPhoneNumber = phoneNumberList;
    }

    if (this.listRegion.length === 0) {
      const regionList = await this.updateListRegion().toPromise();
      this.listRegion = regionList;
    }

    if (this.listState.length === 0) {
      const stateList = await this.updateListState().toPromise();
      this.listState = stateList;
    }

    if (this.listTimeZone.length === 0) {
      const timeZoneList = await this.updateListTimeZone().toPromise();
      this.listTimeZone = timeZoneList;
    }
  }

  listsAreNotEmpty(): boolean {
    return (
      this.listGender.length > 0 &&
      this.listLocation.length > 0 &&
      this.listLogin.length > 0 &&
      this.listNationality.length > 0 &&
      this.listPhoneNumber.length > 0 &&
      this.listRegion.length > 0 &&
      this.listState.length > 0 &&
      this.listTimeZone.length > 0
    );
  }

  getStateNameById(id: number) {
    if (this.listState.length == 0) {
      this.updateListState().subscribe((typesList) => {
        this.listState = typesList;
      });
    }
    return this.listState[id - 1].description;
  }

  getStateAbreviationById(id: number) {
    if (this.listState.length == 0) {
      this.updateListState().subscribe((typesList) => {
        this.listState = typesList;
      });
    }
    // Retorna a abreviação do estado se existir; caso contrário, retorna undefined.
    return (
      this.listState &&
      this.listState[id - 1] &&
      this.listState[id - 1].abbreviation
    );
  }
}
