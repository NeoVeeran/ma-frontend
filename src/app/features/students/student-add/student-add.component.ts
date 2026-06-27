import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from 'src/app/core/services/student.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
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
    this.studentService.getAllBelts().subscribe((data) => {
      console.log('Belts API Response:', data);
      this.belts = data;
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
    this.studentService.addStudent(this.form.value).subscribe(() => {
      this.router.navigate(['/students']);
    });
  }
  updateStudent() {
    this.studentService
      .updateStudent(this.studentId, this.form.value)
      .subscribe(() => {
        this.router.navigate(['/students']);
      });
  }
}
