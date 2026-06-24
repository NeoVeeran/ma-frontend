import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../core/services/student.service';
import { Student } from '../../../core/models/student.model';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  displayedColumns = ['id', 'name', 'beltRank', 'actions'];
  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }
  loadStudents() {
    this.studentService.getStudents().subscribe((data) => {
      this.students = data;
    });
  }

  deleteStudent(id: number) {
    this.studentService.deleteStudent(id).subscribe({
      next: () => {
        this.loadStudents();
      },
      error: (err) => console.error(err),
    });
  }
}
