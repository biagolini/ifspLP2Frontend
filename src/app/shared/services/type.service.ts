import { TypeModelDual, TypeModelSingle, TypeTimeZone } from './../models/models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TypeService {
  constructor(private http: HttpClient) {  }
  public listGender : TypeModelSingle[] = [];
  public listLocation : TypeModelSingle[] = [];
  public listLogin : TypeModelSingle[] = [];
  public listNationality : TypeModelDual[] = [];
  public listPhoneNumber : TypeModelSingle[] = [];
  public listRegion : TypeModelSingle[] = [];
  public listState : TypeModelDual[] = [];
  public listTimeZone : TypeTimeZone[] = [];

  updateListGender() {
    return this.http.get<any>(`${environment.apiUrl}/types/getGender`).pipe(take(1));
  }

  updateListLocation() {
    return this.http.get<any>(`${environment.apiUrl}/types/getLocation`).pipe(take(1));
  }

  updateListLogin() {
    return this.http.get<any>(`${environment.apiUrl}/types/getLogin`).pipe(take(1));
  }

  updateListNationality() {
    return this.http.get<any>(`${environment.apiUrl}/types/getNationality`).pipe(take(1));
  }

  updateListPhoneNumber() {
    return this.http.get<any>(`${environment.apiUrl}/types/getPhoneNumber`).pipe(take(1));
  }

  updateListRegion() {
    return this.http.get<any>(`${environment.apiUrl}/types/getRegion`).pipe(take(1));
  }

  updateListState() {
    return this.http.get<any>(`${environment.apiUrl}/types/getState`).pipe(take(1));
  }

  updateListTimeZone() {
    return this.http.get<any>(`${environment.apiUrl}/types/getlistTimeZone`).pipe(take(1));
  }


  fillTypesIfEmpty(){
    if(this.listGender.length==0){
      this.updateListGender().subscribe (typesList =>  {
        this.listGender = typesList
      });
    }
    if(this.listLocation.length==0){
      this.updateListLocation().subscribe (typesList =>  {
        this.listLocation = typesList
      });
    }
    if(this.listLogin.length==0){
      this.updateListLogin().subscribe (typesList =>  {
        this.listLogin = typesList
      });
    }
    if(this.listNationality.length==0){
      this.updateListNationality().subscribe (typesList =>  {
        this.listNationality = typesList
      });
    }
    if(this.listPhoneNumber.length==0){
      this.updateListPhoneNumber().subscribe (typesList =>  {
        this.listPhoneNumber = typesList
      });
    }
    if(this.listRegion.length==0){
      this.updateListRegion().subscribe (typesList =>  {
        this.listRegion = typesList
      });
    }
    if(this.listState.length==0){
      this.updateListState().subscribe (typesList =>  {
        this.listState = typesList
      });
    }
    if(this.listTimeZone .length==0){
      this.updateListTimeZone ().subscribe (typesList =>  {
        this.listTimeZone  = typesList
      });
    }
  }

  getStateNameById(id:number){
    if(this.listState.length==0){
      this.updateListState().subscribe (typesList =>  {
        this.listState = typesList
      });
    }
    return this.listState[id-1].description;
  }


  getStateAbreviationById(id:number){
    if(this.listState.length==0){
        this.updateListState().subscribe (typesList =>  {
            this.listState = typesList
        });
    }
    // Retorna a abreviação do estado se existir; caso contrário, retorna undefined.
    return this.listState && this.listState[id-1] && this.listState[id-1].abbreviation;
}


}
