import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  exports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
  ],
})
export class MaterialModule {}
