import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FeeListComponent } from './fee-list/fee-list.component';
import { FeeAddComponent } from './fee-add/fee-add.component';

const routes: Routes = [
  {
    path: '',
    component: FeeListComponent,
  },
  {
    path: 'add',
    component: FeeAddComponent,
  },
  {
    path: 'edit/:id',
    component: FeeAddComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeesRoutingModule {}
