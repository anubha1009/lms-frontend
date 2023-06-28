import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LibrarianServiceService {
  
  private baseurl: any;

  constructor(
    private http: HttpClient
   
  ) {
    this.baseurl = environment.BASE_URL;
   }

  getAllBooks(){
    return this.http.get(this.baseurl + '/books' + '/all');
  }
  getBookById(id:number){
    return this.http.get(this.baseurl + '/books/' + id);
  }
  // add book with post method and body
  addBook(data:any){
    return this.http.post(this.baseurl + '/books', data);
  }
  // update book with put method and body
  updateBook(data: any , id: number){
    return this.http.put(this.baseurl + '/books/' + id, data);
  }
  // delete book with delete method and body
  deleteBook(id:number){
    return this.http.delete(this.baseurl + '/books/' + id);
  }
}
