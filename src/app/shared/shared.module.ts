import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';

import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [NavbarComponent, SidebarComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    NavbarComponent,
    SidebarComponent,
  ],
})
export class SharedModule {}
