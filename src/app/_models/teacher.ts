import { Subject } from "./subject"

export class Teacher {
    public id: string = ''
    public name: string = ''
    public neptun: string = ''
    public birthYear: number = 0
    public image: string = ''
    public creatorName: string = ''
    public teachedSubjects: Array<Subject> = [] 

    public createSubjects(subjectList: Array<Subject>) {
        subjectList.map(x => {
            let s = new Subject()
            s.id = x.id
            s.name = x.name
            s.neptun = x.neptun
            s.credit = x.credit
            s.exam = x.exam
            s.image = x.image
            s.creatorName = x.creatorName
            s.registeredStudents = x.registeredStudents
            this.teachedSubjects.push(s)
        })
    }
}