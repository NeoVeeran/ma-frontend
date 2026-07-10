import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { FeesRoutingModule } from './fees-routing.module';

import { FeeListComponent } from './fee-list/fee-list.component';
import { FeeAddComponent } from './fee-add/fee-add.component';

@NgModule({
  declarations: [FeeListComponent, FeeAddComponent],
  imports: [SharedModule, FeesRoutingModule],
})
export class FeesModule {}
