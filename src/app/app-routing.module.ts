import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTeachersComponent } from './list-teachers/list-teachers.component';
import { ListSubjectsComponent } from './list-subjects/list-subjects.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ApiService } from './api.service';
import { UpdateTeacherComponent } from './update-teacher/update-teacher.component';
import { CreateTeacherComponent } from './create-teacher/create-teacher.component';

const routes: Routes = [
  { path: '', component: ListTeachersComponent, canActivate: [ApiService] },
  { path: 'list-teachers', component: ListTeachersComponent, canActivate: [ApiService] },
  { path: 'update-teacher/:id', component: UpdateTeacherComponent, canActivate: [ApiService] },
  { path: 'create-teacher', component: CreateTeacherComponent, canActivate: [ApiService] },
  { path: 'list-subjects', component: ListSubjectsComponent, canActivate: [ApiService] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [ApiService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
