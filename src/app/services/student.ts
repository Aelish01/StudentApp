import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Student } from '../components/Student/student';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private students = new BehaviorSubject<Student[]>([
    {
      id: 1,
      name: 'Aelish Patel',
      email: 'aelish@gmail.com',
      phone: '9876543210',
      gender: 'Female',
      dateOfBirth: '2000-05-15',
      course: 'Angular',
      address: '123 Main Street, Ahmedabad, Gujarat, India',
      hobbies: ['Reading', 'Travel'],
    },
    {
      id: 2,
      name: 'Rahul Shah',
      email: 'rahul@gmail.com',
      phone: '9876543211',
      gender: 'Male',
      dateOfBirth: '1999-08-20',
      course: 'React',
      address: '456 Park Avenue, Mumbai, Maharashtra, India',
      hobbies: ['Music', 'Gaming'],
    },
  ]);

  students$ = this.students.asObservable();

  add(student: Student) {
    this.students.next([...this.students.value, student]);
  }

  update(student: Student) {
    const updated = this.students.value.map((s) => (s.id === student.id ? student : s));
    this.students.next(updated);
  }

  delete(id: number) {
    this.students.next(this.students.value.filter((s) => s.id !== id));
  }
}
