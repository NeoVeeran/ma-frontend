import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule,
          ),
      },
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
    ],
  },

  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
