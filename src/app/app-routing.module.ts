import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
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
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
