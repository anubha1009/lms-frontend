import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LibrarianComponent } from './librarian/librarian.component';
import { StudentComponent } from './student/student.component';
import { LibrarianHomeComponent } from './librarian-home/librarian-home.component';
import { ManageStudentsComponent } from './manage-students/manage-students.component';
const routes: Routes = [
  { path:'login', component: LoginComponent},
  { path:'', redirectTo: '/login', pathMatch: 'full'},
  { path:'librarian', component: LibrarianHomeComponent},
  {path:'manageBooks', component: LibrarianComponent},
  {path:'manageStudents', component: ManageStudentsComponent},
  {path:'student', component: StudentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
