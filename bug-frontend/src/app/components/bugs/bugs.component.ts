<<<<<<< Updated upstream
import { Component } from '@angular/core';
=======
import { Component, OnInit } from '@angular/core';
import { BugService } from 'src/app/services/bug.service';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';

>>>>>>> Stashed changes

@Component({
  selector: 'app-bugs',
  templateUrl: './bugs.component.html',
  styleUrls: ['./bugs.component.css']
})
export class BugsComponent {

<<<<<<< Updated upstream
}
=======
export class BugsComponent implements OnInit {
  bugs: any[] = [];
  projects: any[] = [];
  showBugForm: boolean = false;
  bugForm: FormGroup;

  constructor(private bugService: BugService, private projectService: ProjectService, private fb: FormBuilder) {
    this.bugForm = this.fb.group({
      name: ['', Validators.required],
      summary: ['', Validators.required],
      description: ['', Validators.required],
      userName: [''],
      selectedOptionState: ['', Validators.required],
      selectedOptionPriority: ['', Validators.required],
      selectedOptionSeverity: ['', Validators.required],
      expectedCompletionAt: ['', Validators.required],
      selectedOptionProjectName: ['', Validators.required],
      selectedOptionColaborations: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadBugs();
    this.loadProjects();
  }

  onProjectSelectChange() {
  
    const selectedProjectName = this.bugForm.get('selectedOptionProjectName')?.value;
    const selectedProject = this.projects.find(project => project.name === selectedProjectName);
  
    if (selectedProject) {
      console.log('Selected Project:', selectedProject);
    } else {
      console.log('Project not found');
    }
  
    // Reinicia la lista de colaboradores
    this.bugForm.get('selectedOptionColaborations')?.setValue('');
  
    // Asigna la lista de colaboradores al formulario si el proyecto está seleccionado
    if (selectedProject && selectedProject.collaborators && selectedProject.collaborators.length > 0) {
      const collaboratorsNames = (selectedProject.collaborators as any[]).map(collaborator => collaborator.collaborator);
      const collaboratorsString = collaboratorsNames.join(', ');
  
      console.log('Collaborators:', collaboratorsString);

      this.bugForm.get('selectedOptionColaborations')?.setValue(collaboratorsNames);

    }
  }

  SearchButtonClick(): void {
    // Coloca aquí la lógica que deseas ejecutar cuando se hace clic en el botón
    console.log('Botón de búsqueda clicado');
  }

  loadProjects() {
    this.projectService.getProjects().subscribe(
      (data) => {
        this.projects = data;
        this.projects.forEach(project => {
          console.log(project);
        });
      },
      (error) => {
        console.error('Error fetching projects:', error);
        // Puedes manejar el error de la manera que consideres adecuada
      },
      () => {
        console.log('Projects loaded successfully');
        // Puedes realizar acciones adicionales después de que se complete la solicitud
      }
    );
  }
  

  loadBugs() {
    this.bugService.getBugs().subscribe(
      (data) => {
        this.bugs = data;

        // Aquí puedes acceder a la información del usuario para cada bug
        this.bugs.forEach(bug => {
          console.log(bug);
        });
      },
      (error) => {
        console.error('Error fetching bugs:', error);
      }
    );
  }

  openBugForm() {
    this.showBugForm = true;
  }

  closeBugForm() {
    this.showBugForm = false;
  }

  submitBugForm() {
    // Lógica para enviar el formulario y manejar la respuesta
    const bugData = this.bugForm.value;
    // Envia bugData al servicio para crear o actualizar el bug
    // Puedes llamar al servicio bugService.createBug(bugData) o bugService.updateBug(bugData)
    // Maneja la respuesta del servicio según tus necesidades
    this.closeBugForm(); // Cierra el formulario después de enviar
  }
}
>>>>>>> Stashed changes
