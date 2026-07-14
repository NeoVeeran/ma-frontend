import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ConfirmDialogComponent } from './component/confirm-dialog/confirm-dialog.component';
import { LoadingComponent } from './component/loading/loading.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    ConfirmDialogComponent,
    LoadingComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterModule],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    NavbarComponent,
    SidebarComponent,
    RouterModule,
    LoadingComponent,
  ],
})
export class SharedModule {}
