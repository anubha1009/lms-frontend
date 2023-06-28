import { Component, OnInit } from '@angular/core';
import { LibrarianServiceService } from '../librarian/librarian-service.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})

export class StudentComponent implements OnInit{
  books: any;
  userEmail: string = '';
  userRole: string = '';
  manageBooks: boolean = false;
 constructor(private librarianService: LibrarianServiceService,) { }
  ngOnInit(): void {
    this.getAllbooks();
    this.userEmail = localStorage.getItem('userEmail') as string;
    this.userRole = localStorage.getItem('role') as string;
  }

  getAllbooks(type?:any){
    this.librarianService.getAllBooks().subscribe(res => {
      this.books=res;
      console.log(res);
      if(type == 'issue'){
        this.books = this.books.filter((book:any) => book.issuedTo == this.userEmail);
      }
      else{
        this.manageBooks = false;
      }
    } );
  }

  processBookTxn(type: string, book: any){
    if(type == 'issue'){
      book.issued = true;
      book.issuedTo = this.userEmail;
    }
    else if(type == 'return'){
      book.issued = false;
      book.issuedTo = '';
    }
    this.librarianService.updateBook(book, book.bookId as number).subscribe((res:any) => {
      if(res?.issued){
        alert("Book: " + book.bookName +" Issued to " + book.issuedTo);
      }
      else{
        alert("Book: " + book.bookName +" Returned");
      }
      console.log(res);
      if(this.manageBooks){
        this.viewIssuedBooks();
      }
      else{
        this.getAllbooks();
      }
    });
  }

  viewIssuedBooks(){
    this.manageBooks = true;
    this.getAllbooks('issue');  
  }

}
