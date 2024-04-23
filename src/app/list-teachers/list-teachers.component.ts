import { Component, OnInit } from '@angular/core';
import { Teacher } from '../_models/teacher';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-teachers',
  templateUrl: './list-teachers.component.html',
  styleUrl: './list-teachers.component.scss'
})
export class ListTeachersComponent implements OnInit{
  http: HttpClient
  teachers: Array<Teacher>
  isInEdit: boolean = false 
  teacher: Teacher
  snackBar: MatSnackBar



  constructor(http: HttpClient, snackBar: MatSnackBar) {
    this.http = http
    this.teachers = []
    this.teacher = new Teacher()
    this.snackBar = snackBar
  }

  ngOnInit(): void {
    this.getTeachers()

  }
  getTeachers() {
    this.http.get<Array<Teacher>>('https://practiceapi.nikprog.hu/Teacher')
    .subscribe( resp => {
      this.teachers = []
      resp.map(x => {
        let t = new Teacher()
        t.id = x.id
        t.name = x.name
        t.neptun = x.neptun
        t.birthYear = x.birthYear
        t.image = x.image
        t.creatorName = x.creatorName
        t.createSubjects(x.teachedSubjects)
        this.teachers.push(t)
      })
    })
  }
  closeEditMode() {
    this.isInEdit = false
  }
  openEdit(teacherId: string) {
    this.http
    .get<any>('https://practiceapi.nikprog.hu/Teacher')
    .subscribe(resp => {
      resp
      .filter((x: any) => x.id === teacherId)
      .map((x: any) => {
        this.teacher.id = x.id
        this.teacher.name = x.name
        this.teacher.neptun = x.neptun
        this.teacher.birthYear = x.birthYear
        this.teacher.image = x.image
        this.teacher.creatorName = x.creatorName
      })
    })
    this.isInEdit = true
  }
  updateTeacher(): void {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('nikprog-practiceapi-token')
    })
    this.http.put('https://practiceapi.nikprog.hu/Teacher', this.teacher, { headers: headers }).subscribe(
      (success) => {
        this.snackBar.open("Update was successfull", "Close", { duration: 2000 })
        this.getTeachers()
      },
      (error) => {
        this.snackBar.open("Update failed", "Close", { duration: 2000 })
      }
    )
  }
}
