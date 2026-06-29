import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/core/models/student.model';
import { StudentService } from 'src/app/core/services/student.service';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.scss'],
})
export class StudentViewComponent {
  student: Student | null = null;

  studentId!: number;
  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
  ) {}
  ngOnInit() {
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));

    this.loadStudent();
  }
  loadStudent() {
    this.studentService.getStudentById(this.studentId).subscribe({
      next: (res) => {
        this.student = res;
      },
    });
  }
}
