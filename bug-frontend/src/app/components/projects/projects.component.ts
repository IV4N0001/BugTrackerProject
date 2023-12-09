import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Project } from 'src/app/interfaces/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})

export class ProjectsComponent {
  projects: any[] = [];
  loading: boolean = false;
  showProjectForm: boolean = false;
  projectForm: FormGroup;

  constructor(private projectService: ProjectService, private fb: FormBuilder, private toastr: ToastrService) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      userName: [{ value: '' }, Validators.required],
      description: ['', Validators.required],
      expectedCompletionAt: ['', Validators.required],
      category: ['OPEN', Validators.required]
    });

    this.projectForm.patchValue({
      userName: localStorage.getItem('userName') || '',
    });
  }

  ngOnInit(): void {
    this.loadProjects()
  }

  openProjectForm() {
    this.showProjectForm = true;
  }

  closeProjectForm() {
    this.showProjectForm = false;
  }
  
  private loadProjects() {
    this.projectService.getProjects().subscribe(
      (data) => {
        console.log(data);
        this.projects = [data];
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }
  
  createProject() {
    if(this.projectForm.valid) {
      const project: Project = {
        name: this.projectForm.value.name,
        userName: this.projectForm.value.userName,
        description: this.projectForm.value.description,
        expectedCompletionAt: this.projectForm.value.expectedCompletionAt,
        category: this.projectForm.value.category
      };
    
      this.loading = true;
    
      // Llama al servicio para crear el proyecto
      this.projectService.createProject(project).subscribe({
        next: (v) => {
          this.loading = false;
          this.toastr.success('Proyecto creado con éxito!', 'Proyecto Creado');
          console.log(project);
        },
        error: (e: HttpErrorResponse) => {
          this.loading = false;
          if (e.error.msg) {
            this.toastr.error(`Ya existe un proyecto con el nombre: ${project.name}. Intente con otro nombre`, 'Error!');
          } else {
            this.toastr.error(`Uups, ocurrió un error`, 'Error!');
          }
        }
      });

    } else {
      this.toastr.error('No deje ningun campo sin llenar!', 'Error')
    }
  }
}
