import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/Student/student-table/student-table').then((m) => m.StudentTable),
  },
];
