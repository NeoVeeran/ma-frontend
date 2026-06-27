import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [NavbarComponent, SidebarComponent],
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
