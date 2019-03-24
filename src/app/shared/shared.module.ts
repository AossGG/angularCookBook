import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownDirective } from './dropdown.directive';
import {MatButtonModule, MatCheckboxModule,MatInputModule} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog'
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    DropdownDirective,
    CourseDialogComponent
  ], 
  entryComponents: [
    CourseDialogComponent
  ],
  imports:[
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  exports: [
    CommonModule,
    DropdownDirective,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    CourseDialogComponent,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class SharedModule {}
