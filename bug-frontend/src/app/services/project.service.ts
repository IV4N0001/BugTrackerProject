import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../interfaces/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private APPUrl: string;
  private APIUrl: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.APPUrl = environment.endpoint;
    this.APIUrl = 'project';
  }

  getProjects(): Observable<any> {
    const userName = localStorage.getItem('userName');

    console.log(`${this.APPUrl}${this.APIUrl}/getByUser/${userName}`)

    return this.http.get(`${this.APPUrl}${this.APIUrl}/getByUser/${userName}`);
  }

  createProject(project: Project): Observable<any> {
    return this.http.post(`${this.APPUrl}${this.APIUrl}/createProject`, project)
  }
  
  /*sign(user: User): Observable<any> {
    return this.http.post(`${this.APPUrl}${this.APIUrl}/createUser`, user)
  }*/

}
