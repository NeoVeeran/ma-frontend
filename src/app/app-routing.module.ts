import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'students',
    loadChildren: () =>
      import('./features/students/students.module').then(
        (m) => m.StudentsModule,
      ),
  },
  {
    path: 'attendance',
    loadChildren: () =>
      import('./features/attendance/attendance.module').then(
        (m) => m.AttendanceModule,
      ),
  },
  {
    path: 'fees',
    loadChildren: () =>
      import('./features/fees/fees.module').then((m) => m.FeesModule),
  },
  {
    path: '',
    redirectTo: 'students',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
