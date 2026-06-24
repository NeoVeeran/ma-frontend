import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from 'src/app/core/services/student.service';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.scss'],
})
export class StudentAddComponent {
  form!: FormGroup;
  belts: string[] = [];

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
  ) {}
  ngOnInit(): void {
    this.getAllBelts();
    this.buildAddStudentForm();
  }
  getAllBelts() {
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
  save(): void {
    this.studentService.addStudent(this.form.value).subscribe(() => {
      alert('Student Added');
      this.form.reset();
    });
  }
}
