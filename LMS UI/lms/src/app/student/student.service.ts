import { Injectable } from '@angular/core';
import { LibrarianServiceService } from '../librarian/librarian-service.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private librarianService: LibrarianServiceService,) { }
 
}
