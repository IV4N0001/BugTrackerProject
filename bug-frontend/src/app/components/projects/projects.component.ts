import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})

export class ProjectsComponent {
  projects: any[] = [];
  userName: string = '';
  showProjectForm: boolean = false;
  projectForm: FormGroup;

  constructor(private projectService: ProjectService, private fb: FormBuilder) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      userName: [{ value: localStorage.getItem('userName'), disabled: true }, Validators.required],
      description: ['', Validators.required],
      expectedCompletionAt: ['', Validators.required],
      category: ['OPEN', Validators.required]
    });


  }

  ngOnInit(): void {
    // Obtén el nombre de usuario desde el ActivatedRoute
    this.userName = localStorage.getItem('userName') || '';

    if (this.userName.trim() === '') {
      console.warn('userName is empty. Skipping project load.');
      return;
    }

    this.loadProjects()
  }

  openProjectForm() {
    this.showProjectForm = true;
  }

  submitProjectForm() {
    // Aquí puedes agregar la lógica para manejar el envío del formulario
    console.log('Formulario enviado:', this.projectForm.value);

    // Puedes agregar la lógica para guardar el proyecto en tu servicio, por ejemplo:
    // this.projectService.addProject(this.projectForm.value);

    // Luego puedes cerrar el formulario si es necesario
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
    throw new Error('Method not implemented.');
  }
}
