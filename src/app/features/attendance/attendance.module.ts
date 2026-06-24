import { NgModule } from '@angular/core';
import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendanceAddComponent } from './attendance-add/attendance-add.component';
import { AttendanceListComponent } from './attendance-list/attendance-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AttendanceListComponent, AttendanceAddComponent],
  imports: [AttendanceRoutingModule, SharedModule],
})
export class AttendanceModule {}
