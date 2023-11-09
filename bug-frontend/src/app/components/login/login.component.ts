import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
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
  passwordVisible: boolean = false;

  constructor(
    private toastr: ToastrService, 
    private userService: UserService,
    private router: Router
  ) { }

  @ViewChild('passwordField')
  passwordField!: ElementRef;
  
  togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
      this.passwordField.nativeElement.type = this.passwordVisible ? 'text' : 'password';    
  }
  
  @Output() isLoggedInChange = new EventEmitter<boolean>();

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
          this.isLoggedInChange.emit(true);
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



