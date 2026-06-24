import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeeAddComponent } from './fee-add/fee-add.component';
import { FeeListComponent } from './fee-list/fee-list.component';

const routes: Routes = [
  {
    path: 'add',
    component: FeeAddComponent,
  },
  {
    path: '',
    component: FeeListComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeesRoutingModule {}
