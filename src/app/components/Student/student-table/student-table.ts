import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { StudentService } from '../../../services/student';
import { SharedModule } from '../../../shared/shared-module';
import { Student } from '../student';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { StudentForm } from '../student-form/student-form';
import { ConfirmDialog } from '../../confirm-dialog/confirm-dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  standalone: true,
  selector: 'app-student-table',
  imports: [SharedModule],
  templateUrl: './student-table.html',
  styleUrl: './student-table.scss',
})
export class StudentTable implements AfterViewInit {
  displayedColumns = [ 'name', 'email', 'phone', 'gender', 'course', 'actions'];
  dataSource = new MatTableDataSource<Student>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: StudentService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.service.students$.subscribe((res) => {
      this.dataSource.data = res;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
  }

  openDialog(student?: Student) {
    const dialogRef = this.dialog.open(StudentForm, {
      width: '700px',
      maxWidth: '95vw',
      data: student || null,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.open(
          student ? 'Student updated successfully!' : 'Student added successfully!',
          'Close',
          { 
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          }
        );
      }
    });
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '450px',
      data: {
        title: 'Confirm Delete',
        message: '<p style="font-size: 16px;">Are you sure you want to delete this student?</p><p style="color: #f44336;">This action cannot be undone.</p>',
        confirmText: 'Delete',
        cancelText: 'Cancel',
        confirmColor: 'warn'
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.delete(id);
        this.snackBar.open('Student deleted successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
      }
    });
  }
}
