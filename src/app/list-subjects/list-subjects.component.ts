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

  defaultMin: number = 0
  defaultMax: number = 0
  /* sliderMin: number = 0
  sliderMax: number = 0 */
  selectedMin: number = 0
  selectedMax: number = 0
  rangeArray: Array<number> = []

  constructor(http: HttpClient) {
    this.http = http
    this.subjects = []
  }

  ngOnInit(): void {
    this.getSubjects()
  }
  async getSubjects() {
    await this.http.get<Array<Subject>>('https://practiceapi.nikprog.hu/Subject')
    .subscribe( resp => {
      this.subjects = []
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
      this.defaultMin = this.findMinCredit()
      this.defaultMax = this.findMaxCredit()
      this.setRangeArray()
    })
  }

  setRangeArray() {    
    for (let i = this.defaultMin; i < this.defaultMax + 1; i++) {
      this.rangeArray.push(i);
    }
  }
  setFilter() {
    
    console.log(this.subjects.filter(x => ( this.selectedMin <= x.credit && x.credit <= this.selectedMax)))
    this.subjects = this.subjects.filter(x => ( this.selectedMin <= x.credit && x.credit <= this.selectedMax));
  }

  findMinCredit(): number {
    const minCredit = this.subjects.reduce((min, current) => {
      return current.credit < min.credit ? current : min;
    });
    return minCredit.credit;
  }
  findMaxCredit(): number {
    const maxCredit = this.subjects.reduce((max, current) => {
      return current.credit > max.credit ? current : max;
    });
    return maxCredit.credit;
  }
  clickID(id: string) {
    alert(id)
  }
}
