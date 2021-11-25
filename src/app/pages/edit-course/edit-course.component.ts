import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { DurationUnit } from '../../models/duration-unit.enum';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditCourseComponent implements OnInit {
  public id: string = '';

  public courseForm: FormGroup;

  public contentsFormArray: FormArray;

  public plansFormArray: FormArray;

  public advantagesFormArray: FormArray;

  public durationUnits = DurationUnit;

  constructor(
    private route: ActivatedRoute,
    private builder: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) {
    this.contentsFormArray = this.builder.array([]);

    this.plansFormArray = this.builder.array([]);

    this.advantagesFormArray = this.builder.array([]);

    this.courseForm = this.builder.group({
      name: [''],
      author: this.builder.group({
        firstName: '',
        lastName: '',
      }),
      contents: this.contentsFormArray,
      duration: this.builder.group({
        value: '',
        unit: '',
      }),
      plans: this.plansFormArray,
      sales: this.builder.group({
        start: '',
        end: '',
      }),
    });
  }

  public ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    const editingCourse = this.dataService.getCourse(this.id);
    if (editingCourse) {
      const { contents, plans, sales, ...otherValues } = editingCourse;
      this.courseForm.patchValue(otherValues, { emitEvent: false });

      contents.forEach(({ name, type }) => {
        this.contentsFormArray.push(
          this.builder.group({
            name,
            type,
          }),
          { emitEvent: false }
        );
      });

      plans.forEach((plan) => {
        const { advantages, name, price } = plan;

        advantages?.forEach(({ title, available }) =>
          this.advantagesFormArray.push(
            this.builder.group({
              title,
              available,
            }),
            { emitEvent: false }
          )
        );

        this.plansFormArray.push(
          this.builder.group({
            name,
            price,
            advantages: this.advantagesFormArray,
          }),
          { emitEvent: false }
        );
      });

      const { start, end } = sales ?? {
        start: new Date(),
        end: new Date(),
      };

      this.courseForm.patchValue(
        {
          sales: {
            start: this.getDate(start),
            end: this.getDate(end),
          },
        },
        { emitEvent: false }
      );

      this.courseForm.valueChanges.pipe(debounceTime(200)).subscribe(() => {
        this.updateCourse();
      });

      return;
    }

    this.router.navigateByUrl('/');
  }

  public getDate(date: Date | undefined): string | void {
    if (date) {
      return `${date.getFullYear().toString()}-${(
        date.getMonth() + 1
      ).toString()}-${date.getDate().toString()}`;
    }
  }

  public async updateCourse() {
    const { sales, ...otherValue } = this.courseForm.value;
    const { start, end } = sales;
    const startDate = new Date(start);
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);

    const endDate = new Date(end);
    endDate.setHours(23);
    endDate.setMinutes(59);
    endDate.setSeconds(59);

    const dataModel = {
      sales: {
        start: startDate,
        end: endDate,
      },
      ...otherValue,
    };

    return this.dataService.updateCourse(this.id, dataModel);
  }

  public saveCourse() {
    this.updateCourse().then(() => {
      this.router.navigateByUrl('/');
    });
  }
}
