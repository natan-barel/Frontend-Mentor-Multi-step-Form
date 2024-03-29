import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { addOnOptions } from './addOnOptions.model';
import { StepComponentBase } from '@wizard/stepper/step-component-base/step-component-base';
import { FormService } from '@wizard/services/form.service';
import { timeFrame } from '../step-two-plan-details/planDetails.model';

@Component({
  selector: 'app-step-three-add-ons',
  templateUrl: './step-three-add-ons.component.html',
  styleUrls: ['./step-three-add-ons.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepThreeAddOnsComponent extends StepComponentBase implements OnInit {
  stepForm: FormGroup;
  addOnOptions = addOnOptions;
  timeFrame: timeFrame;
  previousCost = this.formService.getFormGroupRefByName('planDetails')

  constructor(protected override formService: FormService, protected override cdr: ChangeDetectorRef) {
    super(formService, cdr)
  }


  override ngOnInit(): void {
    this.stepForm = this.formService.getFormGroupRefByIndex(this.stepIndex);
    console.log(this.stepForm);
    this.timeFrame = this.previousCost.value.duration;
    this.previousCost.valueChanges.subscribe((value) => {
      console.log(value);
      this.timeFrame = this.previousCost.value.duration;
      this.updateAddOns();
    });

  }


  updateAddOns() {
    // const previousTotalCost = this.previousCost.value.totalCost;

    let serviceCostUpdated = this.stepForm.value.service ? this.addOnOptions[0].timeFrame[this.timeFrame].addToTotal : 0;
    let storageCostUpdated = this.stepForm.value.storage ? this.addOnOptions[1].timeFrame[this.timeFrame].addToTotal : 0;
    let customizationCostUpdated = this.stepForm.value.customization ? this.addOnOptions[2].timeFrame[this.timeFrame].addToTotal : 0;

    this.stepForm.patchValue({
      serviceCost: serviceCostUpdated,
      storageCost: storageCostUpdated,
      customizationCost: customizationCostUpdated,
    })
    // this.previousCost.patchValue({
    //   totalCost: previousTotalCost + serviceCostUpdated + storageCostUpdated + customizationCostUpdated
    // })
  }




  toggleAddOn(event: any, addOn: any) {
    const previousTotalCost = this.previousCost.value.totalCost
    let addOnCost = this.addOnOptions[this.addOnOptions.findIndex(a => a.formName == addOn)].timeFrame[this.timeFrame].addToTotal;

    if (event.checked === true) {
      this.stepForm.patchValue({
        [addOn]: true,
        [addOn.concat('Cost')]: addOnCost,
      })
      this.previousCost.patchValue({
        totalCost: previousTotalCost + addOnCost
      })
    }

    if (event.checked === false) {
      this.stepForm.patchValue({
        [addOn]: false,
        [addOn.concat('Cost')]: 0,
      })
      this.previousCost.patchValue({
        totalCost: previousTotalCost - addOnCost
      })
    }
  }
}
