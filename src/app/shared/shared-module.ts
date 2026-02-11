import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material-module';

@NgModule({
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: [CommonModule, ReactiveFormsModule, MaterialModule],
})
export class SharedModule {}
