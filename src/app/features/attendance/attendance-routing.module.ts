import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceAddComponent } from './attendance-add/attendance-add.component';
import { AttendanceListComponent } from './attendance-list/attendance-list.component';

const routes: Routes = [
  {
    path: '',
    component: AttendanceListComponent,
  },
  {
    path: 'add',
    component: AttendanceAddComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendanceRoutingModule {}
