import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../../services/student';
import { SharedModule } from '../../../shared/shared-module';
import { Student } from '../student';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogActions, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  standalone: true,
  selector: 'app-student-form',
  imports: [SharedModule, MatDialogActions, MatDialogTitle, MatDialogContent, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './student-form.html',
  styleUrl: './student-form.scss',
})
export class StudentForm {
  hobbyList = ['Reading', 'Travel', 'Music'];
  form: FormGroup;
  selectedHobbies: string[] = [];
  maxDate: Date;

  constructor(
    private fb: FormBuilder,
    private service: StudentService,
    private dialogRef: MatDialogRef<StudentForm>,
    @Inject(MAT_DIALOG_DATA) public data: Student
  ) {
    const today = new Date();
    this.maxDate = today;

    this.form = this.fb.group({
      id: [0],
      name: ['', [
        Validators.required, 
        Validators.minLength(3),
        Validators.pattern(/^[a-zA-Z\s]+$/)
      ]],
      email: ['', [
        Validators.required, 
        Validators.email
      ]],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/)
      ]],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      course: ['', Validators.required],
      address: ['', [
        Validators.required,
        Validators.minLength(10)
      ]],
      hobbies: [[]],
    });

    if (data) {
      this.form.patchValue(data);
      this.selectedHobbies = [...data.hobbies];
    } else {
      this.form.patchValue({ id: Date.now() });
    }
  }

  isHobbySelected(hobby: string): boolean {
    return this.selectedHobbies.includes(hobby);
  }

  onHobbyChange(hobby: string, event: MatCheckboxChange) {
    if (event.checked) {
      this.selectedHobbies.push(hobby);
    } else {
      this.selectedHobbies = this.selectedHobbies.filter(h => h !== hobby);
    }
    this.form.patchValue({ hobbies: this.selectedHobbies });
  }


  save() {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.markAsTouched();
      });
      return;
    }

    const studentData = { ...this.form.value, hobbies: this.selectedHobbies };

    if (this.data) {
      this.service.update(studentData as Student);
    } else {
      this.service.add(studentData as Student);
    }

    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
