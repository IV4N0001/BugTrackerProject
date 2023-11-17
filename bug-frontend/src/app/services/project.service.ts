import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private APPUrl: string
  private APIUrl: string
  
  constructor(private http: HttpClient) {
    this.APPUrl = environment.endpoint;
    this.APIUrl = 'project'
  }

  getProjects(userName: string): Observable<any> {
    /*const options = {
      params: {
        userName: userName.toString()
      }
    };*/

    return this.http.get(`${this.APPUrl}/${this.APIUrl}/getByUser/${userName}`);
  }
}
