import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {
  Attendance,
  AttendanceService,
} from 'src/app/core/services/attendance.service';
import { ConfirmDialogComponent } from 'src/app/shared/component/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.scss'],
})
export class AttendanceListComponent implements OnInit {
  attendanceList: Attendance[] = [];

  readonly displayedColumns: string[] = [
    'studentName',
    'attendanceDate',
    'present',
    'actions',
  ];

  constructor(
    private attendanceService: AttendanceService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadAttendance();
  }

  loadAttendance() {
    this.attendanceService.getAttendance().subscribe({
      next: (res) => {
        this.attendanceList = res;
      },
    });
  }

  deleteAttendance(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Attendance',
        message: 'Are you sure you want to delete this attendance?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.attendanceService.deleteAttendance(id).subscribe({
          next: () => {
            this.loadAttendance();
          },
        });
      }
    });
  }
}
