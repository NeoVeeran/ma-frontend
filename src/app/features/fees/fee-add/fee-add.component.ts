import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Fee, FeeService } from 'src/app/core/services/fee.service';
import { StudentService } from 'src/app/core/services/student.service';

@Component({
  selector: 'app-fee-add',
  templateUrl: './fee-add.component.html',
  styleUrls: ['./fee-add.component.scss'],
})
export class FeeAddComponent implements OnInit {
  form!: FormGroup;

  students: any[] = [];

  feeId!: number;

  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private feeService: FeeService,
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      studentId: ['', Validators.required],

      amount: ['', Validators.required],

      paid: [false],
    });

    this.loadStudents();

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEdit = true;

        this.feeId = +params['id'];

        this.loadFee();
      }
    });
  }

  loadStudents() {
    this.studentService.getStudents().subscribe({
      next: (res) => {
        this.students = res;
      },
    });
  }

  loadFee() {
    this.feeService.getFeeById(this.feeId).subscribe({
      next: (fee) => {
        this.form.patchValue(fee);
      },
    });
  }

  saveFee() {
    if (this.form.invalid) {
      return;
    }

    const fee: Fee = this.form.value;

    if (this.isEdit) {
      this.feeService.updateFee(this.feeId, fee).subscribe({
        next: () => {
          this.router.navigate(['/fees']);
        },
      });
    } else {
      this.feeService.addFee(fee).subscribe({
        next: () => {
          this.router.navigate(['/fees']);
        },
      });
    }
  }
}
