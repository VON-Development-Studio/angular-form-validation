import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VonFormValidateDirective } from './von-form-validate/von-form-validate.directive';
import { VonFormValidationDirective } from './von-form-validation/von-form-validation.directive';

@NgModule({
  declarations: [
    VonFormValidateDirective,
    VonFormValidationDirective
  ],
  imports: [
    FormsModule
  ],
  exports: [
    FormsModule,
    VonFormValidateDirective,
    VonFormValidationDirective
  ],
  providers: []
})
export class VonFormModule { }
