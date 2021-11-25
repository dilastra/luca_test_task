import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditCourseComponent } from './edit-course.component';

const routes: Routes = [
  {
    path: '',
    component: EditCourseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCourseRoutingModule {}
