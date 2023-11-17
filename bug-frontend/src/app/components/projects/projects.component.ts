import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  projects: any[] = [];
  userName: string = '';

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Obtén el nombre de usuario desde el ActivatedRoute
    this.route.paramMap.subscribe(params => {
      this.userName = params.get('userName') || '';
    });

    // Llama al servicio con el nombre de usuario
    this.loadProjects();
  }

  private loadProjects() {
    this.projectService.getProjects(this.userName).subscribe(
      (data) => {
        this.projects = data;
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }
}
