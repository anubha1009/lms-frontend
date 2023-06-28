import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-librarian-home',
  templateUrl: './librarian-home.component.html',
  styleUrls: ['./librarian-home.component.css']
})
export class LibrarianHomeComponent implements OnInit {
  userEmail: string = '';
  role: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userEmail = localStorage.getItem('userEmail') as string;
    this.role = localStorage.getItem('role') as string;
  }

    manageBooks(){
      this.router.navigate(['/manageBooks']);
    }

    manageStudents(){
      this.router.navigate(['/manageStudents']);
    }

    logout(){
      localStorage.removeItem('userEmail');
      localStorage.removeItem('role');
      this.router.navigate(['/login']);
    }
}
