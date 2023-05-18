import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StatesModel, TypeModelSingle, TypesModelDual } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  constructor(private http: HttpClient) {  }

  public listGenre: TypesModelDual[] = [];
  public listPlatform: TypeModelSingle[] = [];
  public listState: StatesModel[] = [];
  public listStatusOrder : TypesModelDual[] = [];
  public listWarehouseMovement : TypesModelDual[] = [];

  updateListGenre() {
    return this.http.get<any>(`${environment.apiUrl}/types/getGenre`).pipe(take(1));
  }

  updateListPlatform() {
    return this.http.get<any>(`${environment.apiUrl}/types/getPlatform`).pipe(take(1));
  }

  updateListState() {
    return this.http.get<any>(`${environment.apiUrl}/types/getState`).pipe(take(1));
  }

  updateStatusOrder() {
    return this.http.get<any>(`${environment.apiUrl}/types/getStatusOrder`).pipe(take(1));
  }

  updateListWarehouseMovement() {
    return this.http.get<any>(`${environment.apiUrl}/types/getWarehouseMovement`).pipe(take(1));
  }

  fillTypesIfEmpty(){
    if(this.listGenre.length==0){
      this.updateListGenre().subscribe (typesList =>  {
        this.listGenre = typesList
      });
    }

    if(this.listPlatform.length==0){
      this.updateListPlatform().subscribe (typesList =>  {
        this.listPlatform = typesList
      });
    }

    if(this.listState.length==0){
      this.updateListState().subscribe (typesList =>  {
        this.listState = typesList
      });
    }

    if(this.listStatusOrder.length==0){
      this.updateStatusOrder().subscribe (typesList =>  {
        this.listStatusOrder = typesList
      });
    }
    if(this.listWarehouseMovement.length==0){
      this.updateListWarehouseMovement().subscribe (typesList =>  {
        this.listWarehouseMovement = typesList
      });
    }

  }

  getStateNameById(id:number){
    if(this.listState.length==0){
      this.updateListState().subscribe (typesList =>  {
        this.listState = typesList
      });
    }
    return this.listState[id-1].name;
  }


  getStateAbreviationById(id:number){
    if(this.listState.length==0){
      this.updateListState().subscribe (typesList =>  {
        this.listState = typesList
      });
    }
    return this.listState[id-1].description;
  }



}
