import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Project } from 'src/app/interfaces/project';
import { User } from 'src/app/interfaces/user';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})

export class ProjectsComponent {
  projects: any[] = [];
  users: any[] = [];
  loading: boolean = false;
  showProjectForm: boolean = false;
  showCollaboratorForm: boolean = false;
  showDeleteProjectForm: boolean = false;
  showDeleteCollaboratorForm: boolean = false;
  showChangeCategoryForm: boolean = false;
  projectForm: FormGroup;
  collaboratorForm: FormGroup;
  deleteProjectForm: FormGroup;
  deleteCollaboratorForm: FormGroup;
  //changeCategoryForm: FormGroup;
  currentPage = 1;
  itemsPerPage = 4; // 2 rows of 4 columns

  constructor(private userService: UserService, private projectService: ProjectService, private fb: FormBuilder, private toastr: ToastrService) {
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

    this.collaboratorForm = this.fb.group({
      userSearch: ['', Validators.required],
      role: ['Viewer', Validators.required],
      project: [null, Validators.required],
    });

    this.deleteProjectForm = this.fb.group({
      project: ['', Validators.required],
    });

    this.deleteCollaboratorForm = this.fb.group({
      project: ['', Validators.required],
      userSearch: ['', Validators.required],
    })

  }

  ngOnInit(): void {
    this.loadProjects()
    this.loadUsers() 
  }

  toogleProjectForm() {
    this.showProjectForm = !this.showProjectForm;
    this.showCollaboratorForm = false;
    this.showDeleteProjectForm = false;
    this.showDeleteCollaboratorForm = false;
    this.showChangeCategoryForm = false;
  }

  toogleCollaboratorForm() {
    this.showCollaboratorForm = !this.showCollaboratorForm;
    this.showProjectForm = false;
    this.showDeleteProjectForm = false;
    this.showDeleteCollaboratorForm = false;
    this.showChangeCategoryForm = false;
  }

  toogleDeleteProjectForm() {
    this.showDeleteProjectForm = !this.showDeleteProjectForm;
    this.showCollaboratorForm = false;
    this.showProjectForm = false;
    this.showDeleteCollaboratorForm = false;
    this.showChangeCategoryForm = false;
  }

  toogleDeleteCollaboratorForm() {
    this.showDeleteCollaboratorForm = !this.showDeleteCollaboratorForm;
    this.showCollaboratorForm = false;
    this.showProjectForm = false;
    this.showDeleteProjectForm = false;
    this.showChangeCategoryForm = false;
  }
  
  toogleChangeCategoryForm() {
    this.showChangeCategoryForm = !this.showChangeCategoryForm;
    this.showCollaboratorForm = false;
    this.showProjectForm = false;
    this.showDeleteProjectForm = false;
    this.showDeleteCollaboratorForm = false
  }

  private loadProjects() {
    this.projectService.getProjects().subscribe(
      (data: Project[]) => {
        //console.log(data);
        this.projects = data;
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }
  
  private loadUsers() {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
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
          this.loadProjects();
          this.projectForm.reset();
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

// projects.component.ts
  addCollaborator() {
    if (this.collaboratorForm.valid) {
      const collaboratorData = {
        name: this.collaboratorForm.value.project,
        collaborator: this.collaboratorForm.value.userSearch,
        role: this.collaboratorForm.value.role
      };

      // Lógica para agregar el colaborador al proyecto
      this.projectService.addCollaborator(collaboratorData).subscribe({
        next: (v) => {
          this.loading = false;
          this.toastr.success('Colaborador agregado con éxito!', 'Colaborador Agregado');
          this.loadProjects();
          this.collaboratorForm.reset();
        },
        error: (e: HttpErrorResponse) => {
          this.loading = false;
          this.toastr.error('Error al agregar colaborador', 'Error');
        }
      });
    } else {
      this.toastr.error('No deje ningún campo sin llenar!', 'Error');
    }
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
  }

  deleteProject() {
    if (this.deleteProjectForm.valid) {
      const projectName = this.deleteProjectForm.value.project;

      console.log(projectName);
      this.projectService.deleteProject(projectName).subscribe({
        next: (v) => {
          this.loading = false;
          this.toastr.success('Proyecto eliminado con éxito!', 'Proyecto Eliminado');
          // Puedes realizar alguna acción adicional después de eliminar el proyecto
          // Por ejemplo, recargar la lista de proyectos
          this.loadProjects();
          // Restablece el formulario después de eliminar el proyecto
          this.deleteProjectForm.reset();
        },
        error: (e: HttpErrorResponse) => {
          this.loading = false;
          this.toastr.error('Error al eliminar el proyecto', 'Error');
        }
      });
    } else {
      this.toastr.error('No deje ningún campo sin llenar!', 'Error');
    }
  }

  deleteCollaborator() {
    if (this.deleteCollaboratorForm.valid) {
      const deleteCollaboratorData = {
        projectName: this.deleteCollaboratorForm.value.project,
        collaboratorName: this.deleteCollaboratorForm.value.userSearch,
      };

      console.log(deleteCollaboratorData)
      this.projectService.deleteCollaboratorFromProject(deleteCollaboratorData).subscribe({
        next: (v) => {
          this.loading = false;
          this.toastr.success('Colaborador eliminado con éxito!', 'Colaborador Eliminado');
          this.loadProjects();
          this.deleteCollaboratorForm.reset();
        },
        error: (e: HttpErrorResponse) => {
          this.loading = false;
          this.toastr.error('Error al eliminar colaborador', 'Error');
        }
      });
    } else {
      this.toastr.error('No deje ningún campo sin llenar!', 'Error');
    }
  }

  changeCategory() {

  }
  
}
