import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { LibrarianServiceService } from '../librarian/librarian-service.service';

@Component({
  selector: 'app-manage-students',
  templateUrl: './manage-students.component.html',
  styleUrls: ['./manage-students.component.css']
})
export class ManageStudentsComponent implements OnInit{
  userEmail: string = '';
  role: string = '';
  allUsers: any = [];
  userEmaills: string = '';
  password: string = '';

  constructor(private router: Router, private userService: UserServiceService, private librarianService: LibrarianServiceService) { }
  ngOnInit(): void {
    this.userEmaills = localStorage.getItem('userEmail') || '';
    this.role = localStorage.getItem('role') || '';
    this.getAllUsers();
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe(res => {
      this.allUsers = res;
      this.allUsers = this.allUsers.filter((user: any) => user.role == 'student');
      this.allUsers.forEach((user: any) => {
        user.isEdit = false;
      });
      this.librarianService.getAllBooks().subscribe(resp => {
        // find the books issued by each student and update the count of books issued
        this.allUsers.forEach((user: any) => {
          user.booksIssued = 0;
          let booksArray: any = resp
          booksArray.forEach((book: any) => {
            if(book.issuedTo == user.userEmail){
              user.booksIssued++;
            }
          });
        });
      });
      console.log(res);
    });
  }

  navigateHome(){ 
    this.router.navigate(['/librarian']);
  }

  logout(){
    localStorage.removeItem('userEmail');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  isEditButtonClicked(i: any){
    this.allUsers[i].isEdit = true;
  }

  deleteUser(userEmail: any){
    const data = {
      "userEmail": userEmail
    }
    this.userService.deleteUser(data).subscribe((res:any) => {
      alert(res.message);
      this.getAllUsers();
    },
    (err: any) => alert(err.error.error));
  }

  updateUser(user: any){
    const data = {
      "userEmail": user.userEmail,
      "password": user.password,
      "role": user.role
    }
    this.userService.updateUser(data).subscribe((res:any) => {
      alert(res.message);
      this.getAllUsers();
    }
    );
  }

  addUser(){
    const data = {
      "userEmail": this.userEmail,
      "password": this.password,
      "role": "student"
    }
    this.userService.createUser(data).subscribe((res:any) => {
      this.userEmail = '';
      this.password = '';
      alert(res.message);
      this.getAllUsers();
    },(err: any) => alert(err.error.error)
    );
  }
}
