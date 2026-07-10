import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Fee, FeeService } from 'src/app/core/services/fee.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog.component';

@Component({
  selector: 'app-fee-list',
  templateUrl: './fee-list.component.html',
  styleUrls: ['./fee-list.component.scss'],
})
export class FeeListComponent implements OnInit {
  fees: Fee[] = [];

  displayedColumns = ['studentName', 'amount', 'status', 'actions'];

  constructor(
    private feeService: FeeService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadFees();
  }

  loadFees() {
    this.feeService.getFees().subscribe({
      next: (res) => {
        this.fees = res;
      },
    });
  }

  deleteFee(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Fee',
        message: 'Are you sure you want to delete this fee?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.feeService.deleteFee(id).subscribe({
          next: () => {
            this.loadFees();
          },
        });
      }
    });
  }
}
