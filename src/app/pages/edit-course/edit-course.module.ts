import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditCourseRoutingModule } from './edit-course-routing.module';
import { EditCourseComponent } from './edit-course.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  AdvantagesComponent,
  ContentsComponent,
  PlansComponent,
} from './components';

@NgModule({
  declarations: [
    EditCourseComponent,
    ContentsComponent,
    PlansComponent,
    AdvantagesComponent,
  ],
  imports: [
    CommonModule,
    EditCourseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [EditCourseRoutingModule],
})
export class EditCourseModule {}
