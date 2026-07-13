import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from 'src/app/core/services/student.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog.component';
@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.scss'],
})
export class StudentAddComponent {
  form!: FormGroup;
  belts: string[] = [];
  studentId!: number;
  isEdit = false;
  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
  ) {}
  ngOnInit() {
    this.buildAddStudentForm();
    this.loadBelts();
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEdit = true;
        this.studentId = +params['id'];
        this.loadStudent();
      }
    });
  }
  loadBelts() {
    this.studentService.getAllBelts().subscribe({
      next: (res: any) => {
        this.belts = res;
      },
      error: () => {
        console.error();
      },
    });
  }
  buildAddStudentForm() {
    this.form = this.fb.group({
      name: [''],
      email: [''],
      phone: [''],
      beltRank: [''],
    });
  }
  loadStudent() {
    this.studentService.getStudentById(this.studentId).subscribe((student) => {
      this.form.patchValue(student);
    });
  }
  submit() {
    if (this.isEdit) {
      this.updateStudent();
    } else {
      this.createStudent();
    }
  }
  createStudent() {
    this.studentService.addStudent(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/students']);
      },
      error: (err) => {
        if (err.status === 409) {
          this.dialog.open(ConfirmDialogComponent, {
            width: '350px',
            data: {
              title: 'Duplicate Email',
              message: 'Email already exists.',
              buttonText: 'OK',
              hideCancel: true,
            },
          });
        }
      },
    });
  }
  updateStudent() {
    this.studentService
      .updateStudent(this.studentId, this.form.value)
      .subscribe(() => {
        this.router.navigate(['/students']);
      });
  }
  trackByValue(_: number, value: string): string {
    return value;
  }
}
