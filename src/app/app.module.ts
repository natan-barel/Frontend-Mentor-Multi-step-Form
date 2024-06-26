import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { FormComponent } from './components/form/form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { StepOnePersonalDetailsComponent } from './components/form/form-steps/step-one-personal-details/step-one-personal-details.component';
// import { StepTwoPlanDetailsComponent } from './components/form/form-steps/step-two-plan-details/step-two-plan-details.component';
// import { StepThreeAddOnsComponent } from './components/form/form-steps/step-three-add-ons/step-three-add-ons.component';
// import { StepFourSummaryComponent } from './components/form/form-steps/step-four-summary/step-four-summary.component';
// import { StepFiveConfimComponent } from './components/form/form-steps/step-five-confim/step-five-confim.component';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
// import { ProgressionButtonsComponent } from './components/progression-buttons/progression-buttons.component';
// import { StepTrackerIconsComponent } from './components/step-nav/step-tracker-icons.component';
import { MaterialModule } from './material.module';
import { WizardModule } from '@wizard/wizard.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { multiStepFormReducer } from './store/multi-step-form.reducer';
@NgModule({
  declarations: [
    AppComponent,
    // StepTrackerIconsComponent,
    // ProgressionButtonsComponent,
    // FormComponent,
    // StepOnePersonalDetailsComponent,
    // StepTwoPlanDetailsComponent,
    // StepThreeAddOnsComponent,
    // StepFourSummaryComponent,
    // StepFiveConfimComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // FormsModule,
    // ReactiveFormsModule,
    // MaterialModule,
    WizardModule,
    StoreModule.forRoot({ multiStepForm: multiStepFormReducer }),
    StoreDevtoolsModule.instrument({})
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
