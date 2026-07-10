import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../../../core/services/student.service';
import { Student } from '../../../core/models/student.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog.component';
import { ExcelService } from 'src/app/core/services/excel.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  dataSource = new MatTableDataSource<Student>();
  displayedColumns = ['id', 'name', 'beltRank', 'actions'];
  searchText = '';
  selectedBelt = '';
  belts: string[] = [];
  constructor(
    private studentService: StudentService,
    private dialog: MatDialog,
    private excelService: ExcelService,
  ) {}
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  ngOnInit(): void {
    this.loadStudents();
    this.loadBelts();
    this.dataSource.filterPredicate = (student: Student, filter: string) => {
      const criteria = JSON.parse(filter);
      const matchesSearch = student.name
        .toLowerCase()
        .includes(criteria.search.toLowerCase());
      const matchesBelt = !criteria.belt || student.beltRank === criteria.belt;
      return matchesSearch && matchesBelt;
    };
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  loadStudents() {
    this.studentService.getStudents().subscribe({
      next: (res: Student[]) => {
        this.students = res;
        this.dataSource.data = res;
      },
    });
  }

  applyFilters() {
    this.dataSource.filter = JSON.stringify({
      search: this.searchText,
      belt: this.selectedBelt,
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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Delete Student',
        message: 'Are you sure you want to delete this student?',
        buttonText: 'Delete',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.studentService.deleteStudent(id).subscribe({
          next: () => {
            this.loadStudents();
          },
          error: (err) => console.error(err),
        });
      }
    });
  }
  exportStudents() {
    const data = this.students.map((student) => ({
      ID: student.id,

      Name: student.name,

      Email: student.email,

      Phone: student.phone,

      Belt: student.beltRank,
    }));

    this.excelService.exportAsExcelFile(data, 'Students');
  }
}
