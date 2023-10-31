import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  userName: string = ''
  password: string = ''

  loading: boolean = false;
  isValidToken: any;

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
  
  login() {
    if(this.userName === '' || this.password === '') {
      this.toastr.error('No deje ningun campo sin llenar!', 'Error')
    } else {
      const user: User = {
        userName: this.userName,
        password: this.password
      }

      this.loading = true;

      this.userService.login(user).subscribe({
        next: (token) => {
          localStorage.setItem('token', JSON.stringify(token))
          this.router.navigate(['/dashboard'])
        },
        error: (e: HttpErrorResponse) => {
          this.loading = false
          if(e.status === 404) {
            this.toastr.error(`Credenciales NO validas`, 'Error!')
          } else {
            this.toastr.error(`Uups, ocurrió un error`, 'Error!')
          }
        }
      })
    }
  }
}



