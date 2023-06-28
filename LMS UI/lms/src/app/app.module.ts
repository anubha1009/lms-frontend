import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { LibrarianComponent } from './librarian/librarian.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { StudentComponent } from './student/student.component';
import { LibrarianHomeComponent } from './librarian-home/librarian-home.component';
import { ManageStudentsComponent } from './manage-students/manage-students.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LibrarianComponent,
    StudentComponent,
    LibrarianHomeComponent,
    ManageStudentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [HttpClient ],
  bootstrap: [AppComponent]
})
export class AppModule { }
