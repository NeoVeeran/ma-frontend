import { NgModule } from '@angular/core';
import { FeesRoutingModule } from './fees-routing.module';
import { FeeAddComponent } from './fee-add/fee-add.component';
import { FeeListComponent } from './fee-list/fee-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [FeeListComponent, FeeAddComponent],
  imports: [FeesRoutingModule, SharedModule],
})
export class FeesModule {}
