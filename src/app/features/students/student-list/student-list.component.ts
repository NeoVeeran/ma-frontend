import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../../../core/services/student.service';
import { Student } from '../../../core/models/student.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog.component';
import { ExcelService } from 'src/app/core/services/excel.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  dataSource = new MatTableDataSource<Student>();
  readonly displayedColumns: string[] = ['id', 'name', 'beltRank', 'actions'];
  searchText = '';
  selectedBelt = '';
  belts: string[] = [];
  constructor(
    private studentService: StudentService,
    private dialog: MatDialog,
    private excelService: ExcelService,
    private title: Title,
  ) {}
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  ngOnInit(): void {
    this.title.setTitle('SMS');
    this.loadStudents();
    this.loadBelts();
    this.dataSource.filterPredicate = (data: Student, filter: string) => {
      const search = JSON.parse(filter);

      const matchesSearch = data.name
        .toLowerCase()
        .includes(search.search.toLowerCase());

      const matchesBelt = !search.belt || data.beltRank === search.belt;

      return matchesSearch && matchesBelt;
    };
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  loadStudents() {
    this.studentService.getStudents().subscribe({
      next: (students: Student[]) => {
        this.students = students;
        this.dataSource.data = students;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  applyFilters(): void {
    this.dataSource.filter = JSON.stringify({
      search: this.searchText,
      belt: this.selectedBelt,
    });

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
