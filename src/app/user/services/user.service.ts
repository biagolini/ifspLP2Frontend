import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  findAllPaginated(
    pager: PageEvent,
    sortBy: { field: string | null; asc: boolean | null },
    query: string | null,
    searchForm?: { [key: string]: number | null }
  ) {
    let params = new HttpParams()
      .append('page', pager.pageIndex)
      .append('size', pager.pageSize);
    if (query) params = params.append('query', query);

    if (sortBy.field != null) {
      params = params.append(
        'sort',
        sortBy.field + ',' + (sortBy.asc ? 'asc' : 'desc')
      );
    }
    if (searchForm) {
      for (let key in searchForm) {
        let value = searchForm[key];
        if (value != null) {
          params = params.append(key, value.toString());
        }
      }
    }
    return this.http.get<any>(`${environment.apiUrl}/api/user`, { params });
  }

  getUserById(id: number) {
    return this.http.get<any>(`${environment.apiUrl}/api/user/${id}`);
  }

  createUser(formData: Object) {
    return this.http.post<any>(`${environment.apiUrl}/api/user`, formData);
  }

  updateUser(formData: Object, id: number) {
    return this.http.put<any>(`${environment.apiUrl}/api/user/${id}`, formData);
  }

  deleteUser(id: number) {
    return this.http.delete<any>(`${environment.apiUrl}/api/user/${id}`);
  }

  getPictureUserById(id: number) {
    return this.http.get<any>(
      `${environment.apiUrl}/api/picture/findByUserId/${id}`
    );
  }

  getPhoneNumberUserById(id: number) {
    return this.http.get<any>(
      `${environment.apiUrl}/api/phone/findByUserId/${id}`
    );
  }
}
