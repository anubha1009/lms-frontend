import { Component, OnInit } from '@angular/core';
import { LibrarianServiceService } from './librarian-service.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-librarian',
  templateUrl: './librarian.component.html',
  styleUrls: ['./librarian.component.css']
})
export class LibrarianComponent implements OnInit {
  searchText: number = 0;
  deleteSearchText: number = 0;
  data: any = {};
  bookName: string = '';
  authorName: string = '';
  issued: boolean = false;
  issuedTo: string = '';
  books: any = [];
  isEditClicked: boolean = false;
  updatedData: any = {};
  searchedBook: any = {};
  isSearchClicked: boolean = false;
  userEmail: string = '';
  role: string = '';
  constructor(

    private librarianService: LibrarianServiceService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.userEmail = localStorage.getItem('userEmail') as string;
    this.role = localStorage.getItem('role') as string;
    this.getAllBooks();
  }

  getAllBooks() {
    this.librarianService.getAllBooks().subscribe(res => {
      this.books = res;
      console.log(res);
      // add an edit parameter to each book, and set it to false
      this.books.forEach((book: any) => {
        book.edit = false;
      }
      );
    });
  }
  getBookById(searchText: number) {
    this.isSearchClicked = true;
    this.librarianService.getBookById(searchText).subscribe(res => {
      this.searchedBook = res;
      if (res == null) {
        alert("Book not found");
      }
      console.log(res);
    });

  }
  addBook() {
    this.data.bookName = this.bookName;
    this.data.authorName = this.authorName;
    this.data.issued = this.issued;
    if (this.issued) {
      this.data.issuedTo = this.issuedTo;
    }
    else {
      this.data.issuedTo = "";
      this.issuedTo = "";
    }

    this.librarianService.addBook(this.data).subscribe(res => {
      console.log(res);
      this.getAllBooks();
      this.bookName = '';
      this.authorName = '';
      this.issued = false;
      this.issuedTo = '';
      alert("Book added successfully");
    });

  }
  updateBook(book: any) {
    console.log(book.issuedTo)
    const id = book.bookId;
    const data: any = {
      bookName: book.bookName,
      authorName: book.authorName,
      issued: book.issued,
      issuedTo: book.issuedTo
    }
    if (!book.issued) {
      data.issuedTo = "";
    }
    console.log(data);
    this.librarianService.updateBook(data, id).subscribe(res => {
      console.log(res);
      this.getAllBooks();
    });
  }
  deleteBook(id: number) {
    this.librarianService.deleteBook(id).subscribe(res => {
      console.log(res);
      const book = this.books.find((b: any) => b.bookId === id);
      this.deleteSearchText = 0;
      alert("Book " + book?.bookName + " deleted successfully");
      this.getAllBooks();
    });
  }
  isEditButtonClicked(id: number) {
    this.books[id].edit = true;
    // set all other edit parameters to false
    this.books.forEach((book: any, index: number) => {
      if (index != id) {
        book.edit = false;
      }
    });
    this.updatedData =
      this.formBuilder.group({
        bookName: [this.books[id].bookName],
        authorName: [this.books[id].authorName],
        issued: [this.books[id].issued]
      });
  }

  checkIssued(book: any, event: any) {
    book.issued = event;
    if (!event) {
      book.issuedTo = "";
    }
  }

  checkAddIssued(event: any) {
    this.issued = event;
    if (!event) {
      this.issuedTo = "";
    }
  }

  navigateHome() {
    this.router.navigate(['/librarian']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
