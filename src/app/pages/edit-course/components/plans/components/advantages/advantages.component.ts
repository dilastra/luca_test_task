import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-advantages',
  templateUrl: './advantages.component.html',
  styleUrls: ['./advantages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvantagesComponent {
  @Input()
  public formGroup!: FormGroup;

  @Input()
  public advantagesFormArray: FormArray;

  constructor(private builder: FormBuilder) {
    this.advantagesFormArray = this.builder.array([]);
  }

  public deleteAdvantages(id: number) {
    this.advantagesFormArray.removeAt(id);
  }

  public addAdvantages() {
    this.advantagesFormArray.push(
      this.builder.group({
        title: '',
        available: false,
      })
    );
  }
}
