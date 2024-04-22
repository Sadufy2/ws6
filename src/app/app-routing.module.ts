import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTeachersComponent } from './list-teachers/list-teachers.component';
import { ListSubjectsComponent } from './list-subjects/list-subjects.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'list-teachers', component: ListTeachersComponent },
  { path: 'list-subjects', component: ListSubjectsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
