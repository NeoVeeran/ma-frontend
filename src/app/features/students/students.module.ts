import { NgModule } from '@angular/core';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentAddComponent } from './student-add/student-add.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentViewComponent } from './student-view/student-view.component';

@NgModule({
  declarations: [
    StudentListComponent,
    StudentAddComponent,
    StudentEditComponent,
    StudentViewComponent,
  ],
  imports: [StudentsRoutingModule, SharedModule],
})
export class StudentsModule {}
