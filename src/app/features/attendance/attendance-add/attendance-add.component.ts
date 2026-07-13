import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/core/models/student.model';

import {
  AttendanceService,
  Attendance,
} from 'src/app/core/services/attendance.service';

import { StudentService } from 'src/app/core/services/student.service';

@Component({
  selector: 'app-attendance-add',
  templateUrl: './attendance-add.component.html',
})
export class AttendanceAddComponent implements OnInit {
  form!: FormGroup;

  students: any[] = [];

  attendanceId!: number;

  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private attendanceService: AttendanceService,
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      studentId: ['', Validators.required],
      present: [true, Validators.required],
    });

    this.loadStudents();

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEdit = true;

        this.attendanceId = +params['id'];

        this.loadAttendance();
      }
    });
  }

  loadStudents() {
    this.studentService.getStudents().subscribe({
      next: (students: Student[]) => {
        this.students = students;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  loadAttendance() {
    this.attendanceService.getAttendanceById(this.attendanceId).subscribe({
      next: (attendance) => {
        this.form.patchValue(attendance);
      },
    });
  }

  saveAttendance() {
    if (this.form.invalid) {
      return;
    }

    const attendance: Attendance = this.form.value;

    if (this.isEdit) {
      this.attendanceService
        .updateAttendance(this.attendanceId, attendance)
        .subscribe(() => {
          this.router.navigate(['/attendance']);
        });
    } else {
      this.attendanceService.addAttendance(attendance).subscribe(() => {
        this.router.navigate(['/attendance']);
      });
    }
  }
}
