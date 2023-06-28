import { Component } from '@angular/core';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = "";
  password: string = "";
  selectedUserType: string = 'student';
  constructor(private userService: UserServiceService) { }

  onSubmit() {
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    console.log('User type:', this.selectedUserType);
    this.userService.validateUser({
      "userEmail": this.username,
      "password": this.password,
      "role": this.selectedUserType
    }).subscribe((res: any) => {
      localStorage.setItem('userEmail', res.userEmail);
      localStorage.setItem('role', res.role);
      this.reDirect();
    }, (err: any) => {
      alert(err.error.error);
    });
  }
  reDirect() {
    if (this.selectedUserType == 'student') {
      window.location.href = 'http://localhost:4200/student';
    }
    else if (this.selectedUserType == 'librarian') {
      window.location.href = 'http://localhost:4200/librarian';
    }
  }
}
