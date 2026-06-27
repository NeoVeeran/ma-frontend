import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../core/services/student.service';
import { Student } from '../../../core/models/student.model';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  filteredStudents: Student[] = [];
  displayedColumns = ['id', 'name', 'beltRank', 'actions'];
  searchText = '';
  selectedBelt = '';
  belts: string[] = [];
  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
    this.loadBelts();
  }
  loadStudents() {
    this.studentService.getStudents().subscribe({
      next: (res: Student[]) => {
        this.students = res;
        this.filteredStudents = res;
      },
      error: (err) => console.error(err),
    });
  }
  applyFilters() {
    this.filteredStudents = this.students.filter((student) => {
      const matchesSearch = student.name
        .toLowerCase()
        .includes(this.searchText.toLowerCase());

      const matchesBelt =
        !this.selectedBelt || student.beltRank === this.selectedBelt;

      return matchesSearch && matchesBelt;
    });
  }

  loadBelts() {
    this.studentService.getAllBelts().subscribe({
      next: (res) => {
        this.belts = res;
      },
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
