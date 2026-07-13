import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';
import { environment } from './environments';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${environment.apiUrl}/students`);
  }
  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${environment.apiUrl}/students`, student);
  }
  getAllBelts(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiUrl}/belts`);
  }
  deleteStudent(id: number) {
    return this.http.delete(`${environment.apiUrl}/students/${id}`);
  }
  getStudentById(id: number) {
    return this.http.get<Student>(`${environment.apiUrl}/students/${id}`);
  }
  updateStudent(id: number, student: Student) {
    return this.http.put<Student>(
      `${environment.apiUrl}/students/${id}`,
      student,
    );
  }
}
