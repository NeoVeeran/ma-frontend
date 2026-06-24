import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/students`);
  }
  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.apiUrl}/students`, student);
  }
  getAllBelts(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/belts`);
  }
  deleteStudent(id: number) {
    return this.http.delete(`${this.apiUrl}/students/${id}`);
  }
}
