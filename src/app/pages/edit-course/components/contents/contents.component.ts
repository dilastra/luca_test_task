import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ContentsItemType } from '../../../../../app/models/contents-item-type.enum';

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentsComponent {
  @Input()
  public formGroup!: FormGroup;

  @Input()
  public contentsFormArray: FormArray;

  public contentsItemType = ContentsItemType;

  constructor(private builder: FormBuilder) {
    this.contentsFormArray = this.builder.array([
      this.builder.group({
        name: '',
        type: '',
      }),
    ]);
  }

  public deleteContent(id: number): void {
    this.contentsFormArray.removeAt(id);
  }

  public addContent() {
    this.contentsFormArray.push(
      this.builder.group({
        name: '',
        type: '',
      })
    );
  }
}
