import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlansComponent {
  @Input()
  public formGroup!: FormGroup;

  @Input()
  public plansFormArray: FormArray;

  constructor(private builder: FormBuilder) {
    this.plansFormArray = this.builder.array([]);
  }

  public getAdvantagesFormArray(planFormGroup: any): FormArray {
    return planFormGroup?.controls?.advantages as FormArray;
  }

  public getFormGroup(formGroup: AbstractControl): FormGroup {
    return formGroup as FormGroup;
  }

  public deletePlan(id: number) {
    this.plansFormArray.removeAt(id);
  }

  public addPlan() {
    this.plansFormArray.push(
      this.builder.group({
        name: '',
        price: '',
        advantages: this.builder.array([
          this.builder.group({ title: '', available: false }),
        ]),
      })
    );
  }
}
