import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Teacher } from '../_models/teacher';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrl: './create-teacher.component.scss'
})
export class CreateTeacherComponent implements OnInit {
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

  }
  createTeacher(): void {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('nikprog-practiceapi-token')
    })
    this.http.post('https://practiceapi.nikprog.hu/Teacher', this.teacher, { headers: headers }).subscribe(
      (success) => {
        this.snackBar.open("Creation was successfull", "Close", { duration: 2000 })
      },
      (error) => {
        this.snackBar.open("Creation failed", "Close", { duration: 2000 })
      }
    )
  }
}