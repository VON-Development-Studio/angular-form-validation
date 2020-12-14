import { ElementRef, Input } from '@angular/core';
import { FormControl, ValidationErrors, Validator } from '@angular/forms';
import { ValidationMessagesLocalizationModel } from './von-form-validation.model';

export abstract class VonFormValidationBase implements Validator {
  @Input() ngModel?: any;
  @Input() name?: string;
  @Input() customName?: string;

  @Input() required?: boolean;
  @Input() requiredMessage?: string;
  @Input() equalTo?: any;
  @Input() equalIgnoreCase?: boolean;
  @Input() equalToMessage?: string;

  protected validator: ValidationErrors = {};
  protected message = '';
  protected messages: ValidationMessagesLocalizationModel = {
    requiredMessage: '',
    equalToMessage: ''
  };
  protected $label?: HTMLElement;

  constructor(
    protected element: ElementRef
  ) { }

  validate(formValue: FormControl): ValidationErrors {
    this.validator = this.getCustomValidators(formValue.value);
    return this.validator;
  }

  protected getCustomValidators = (value: any): ValidationErrors => {
    return {};
  }

  protected getClosestForm = (element: HTMLElement): HTMLElement => {
    if (element.tagName === 'FORM' || element.tagName === 'BODY') {
      return element;
    }

    const parent = element.parentElement;
    if (parent) {
      return this.getClosestForm(parent);
    }
    return element;
  }

  protected getLabelText = (): string => {
    let labelText = this.name || '';
    if (this.customName) {
      labelText = this.customName;
    }
    if (this.$label && this.$label.innerText) {
      labelText = this.$label.innerText;
    }
    return labelText;
  }

}
