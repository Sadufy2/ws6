import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Teacher } from '../_models/teacher';


@Component({
  selector: 'app-update-teacher',
  templateUrl: './update-teacher.component.html',
  styleUrl: './update-teacher.component.scss'
})
export class UpdateTeacherComponent implements OnInit {
  http: HttpClient
  router: ActivatedRoute
  teacher: Teacher
  snackBar: MatSnackBar

  constructor(http: HttpClient, snackBar: MatSnackBar, router: ActivatedRoute) {
    this.snackBar = snackBar
    this.http = http
    this.router = router
    this.teacher = new Teacher()
  }

  ngOnInit(): void {
    this.router.params.subscribe(param =>{
      let teacherID = param['id']
      this.http
        .get<any>('https://practiceapi.nikprog.hu/Teacher')
        .subscribe(resp => {
          resp
          .filter((x: any) => x.id === teacherID)
          .map((x: any) => {
            this.teacher.id = x.id
            this.teacher.name = x.name
            this.teacher.neptun = x.neptun
            this.teacher.birthYear = x.birthYear
            this.teacher.image = x.image
            this.teacher.creatorName = x.creatorName
            this.teacher.createSubjects(x.teachedSubjects)
          })
        })
    })
  }
  updateTeacher(): void {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('nikprog-practiceapi-token')
    })
    this.http.put('https://practiceapi.nikprog.hu/Teacher', this.teacher, { headers: headers }).subscribe(
      (success) => {
        this.snackBar.open("Update was successfull", "Close", { duration: 2000 })
      },
      (error) => {
        this.snackBar.open("Update failed", "Close", { duration: 2000 })
      }
    )
  }
}
