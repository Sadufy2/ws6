import { Component, OnInit } from '@angular/core';
import { Teacher } from '../_models/teacher';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-teachers',
  templateUrl: './list-teachers.component.html',
  styleUrl: './list-teachers.component.scss'
})
export class ListTeachersComponent implements OnInit{
  http: HttpClient
  teachers: Array<Teacher>

  constructor(http: HttpClient) {
    this.http = http
    this.teachers = []
  }

  ngOnInit(): void {
    this.http.get<Array<Teacher>>('https://practiceapi.nikprog.hu/Teacher')
    .subscribe( resp => {
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
}
