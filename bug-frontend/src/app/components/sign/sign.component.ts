import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})

export class SignComponent {
  userName: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';

  loading: boolean = false;
  
  constructor(
    private toastr: ToastrService, 
    private userService: UserService,
    private router: Router
  ) { }

  @ViewChild('passwordField')
  passwordField!: ElementRef;

  passwordVisible: boolean = false;

  togglePasswordVisibility(): void {
    const passwordElement = this.passwordField.nativeElement as HTMLInputElement;
    const toggleButton = document.querySelector(".toggle-password i");

    if (passwordElement.type === "password") {
      passwordElement.type = "text";
      toggleButton?.classList.remove("fa-eye");
      toggleButton?.classList.add("fa-eye-slash");
    } else {
      passwordElement.type = "password";
      toggleButton?.classList.remove("fa-eye-slash");
      toggleButton?.classList.add("fa-eye");
    }
  }
  
  createUser() {
    if(this.userName === '' || this.firstName === '' || this.lastName === '' || this.email === '' || this.password === '') {
      this.toastr.error('No deje ningun campo sin llenar!', 'Error')
    } else {
      const user: User = {
        userName: this.userName,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      }

      this.loading = true;

      this.userService.sign(user).subscribe({
        next: (v) => {
          this.loading = false;
          this.toastr.success('Te has registrado con exito!', 'Usuario Registrado')
          this.router.navigate(['/login'])
        },
        error: (e: HttpErrorResponse) => {
          this.loading = false
          if(e.error.msg) {
            this.toastr.error(`Ya existe el usuario: ${user.userName}. Intente con otro nombre`, 'Error!')
          } else {
            this.toastr.error(`Uups, ocurrió un error`, 'Error!')
          }
        }
      })
      /*
      this.userService.sign(user).subscribe(() => {
        console.log('Se creó el usuario!')
        this.toastr.success('Te has registrado con exito!', 'Usuario Registrado')
        this.router.navigate(['/login'])
      }, (event: HttpErrorResponse) => {
        console.log(event.error.msg)
        this.loading = false;
        if(event.error.msg) {
          this.toastr.error(`Ya existe el usuario: ${user.userName}. Intente con otro nombre`, 'Error!')
        } else {
          this.toastr.error(`Uups, ocurrió un error`, 'Error!')
        }
      })
      */
    }
  }
}
