import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subject } from '../_models/subject';

@Component({
  selector: 'app-list-subjects',
  templateUrl: './list-subjects.component.html',
  styleUrl: './list-subjects.component.scss'
})
export class ListSubjectsComponent implements OnInit {
  http: HttpClient
  subjects: Array<Subject>

  constructor(http: HttpClient) {
    this.http = http
    this.subjects = []
  }

  ngOnInit(): void {
    //this.seedData()
    this.http.get<Array<Subject>>('https://practiceapi.nikprog.hu/Subject')
    .subscribe( resp => {
      resp.map(x => {
        let s = new Subject()
        s.id = x.id
        s.name = x.name
        s.neptun = x.neptun
        s.credit = x.credit
        s.exam = x.exam
        s.image = x.image
        s.creatorName = x.creatorName
        s.registeredStudents = x.registeredStudents
        this.subjects.push(s)
      })
    })
    console.log(this.subjects)
  }

  seedData() {
    let s1 = new Subject()
    s1.id = "gsgdmpngloisbfbs"
    s1.name = "kliensoldali"
    s1.neptun = "ubgsod"
    s1.credit = 6
    s1.exam = true
    s1.image = "https://wl-brightside.cf.tsp.li/resize/728x/jpg/c65/0b2/c7b9cb5f8fa4f3ab765ba257a8.jpg"
    s1.creatorName = "vala ki"
    s1.registeredStudents = 43

    let s2 = new Subject()
    s2.id = "kjhgafs24qad3"
    s2.name = "szerveroldali"
    s2.neptun = "hsd325"
    s2.credit = 3
    s2.exam = false
    s2.image = "https://imgix.ranker.com/user_node_img/50024/1000479726/original/despite-all-my-rage-i-am-still-just-a-bunny-out-of-my-cage-photo-u1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=375"
    s2.creatorName = "vala ki"
    s2.registeredStudents = 43

    this.subjects.push(s1)
    this.subjects.push(s2)
  }
}
