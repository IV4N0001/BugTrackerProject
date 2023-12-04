import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BugService {
  private APPUrl: string
  private APIUrl: string

  constructor(private http: HttpClient) {
    this.APPUrl = environment.endpoint;
    this.APIUrl = 'bug'
  }

  getBugs(): Observable<any[]> {
    return this.http.get<[]>(`${this.APPUrl}${this.APIUrl}`);
  }

  createBug(bugData: any): Observable<any> {
    return this.http.post(`${this.APPUrl}${this.APIUrl}/createBug`, bugData);
  }

}
