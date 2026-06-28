import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ConfirmDialogComponent } from './components/confirm-dialog.component';

@NgModule({
  declarations: [NavbarComponent, SidebarComponent, ConfirmDialogComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterModule],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    NavbarComponent,
    SidebarComponent,
    RouterModule,
  ],
})
export class SharedModule {}
