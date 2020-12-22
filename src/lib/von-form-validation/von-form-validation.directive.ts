import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormControl, NG_VALIDATORS, ValidationErrors, ValidatorFn } from '@angular/forms';
import { VonFormValidationBase } from './von-form-validation.base';
import { VALIDATION_MESSAGES } from './von-form-validation.constant';

@Directive({
  selector: '[validation]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: VonFormValidationDirective, multi: true }
  ]
})
export class VonFormValidationDirective extends VonFormValidationBase implements OnInit {

  protected wrapperEl: HTMLElement = {} as HTMLElement;
  protected messageEl: HTMLElement = {} as HTMLElement;

  constructor(
    protected element: ElementRef,
    protected renderer: Renderer2
  ) {
    super(element);
  }

  ngOnInit(): void {
    const $closestFormEl = this.element.nativeElement.form || this.getClosestForm(this.element.nativeElement);
    const isValidationEn = !$closestFormEl.hasAttribute('validation-es');
    this.messages = isValidationEn
      ? VALIDATION_MESSAGES.EN
      : VALIDATION_MESSAGES.ES;
    this.$label = $closestFormEl.querySelector(`label[for='${this.name}']`);
    if (this.required && this.$label) {
      this.$label.classList.add('field__label--required');
    }
    this.element.nativeElement.setAttribute('validation', true);

    this.wrapperEl = this.renderer.createElement('div');
    this.renderer.addClass(this.wrapperEl, 'form__field');
    this.renderer.insertBefore(this.element.nativeElement.parentElement, this.wrapperEl, this.element.nativeElement);
    this.renderer.appendChild(this.wrapperEl, this.element.nativeElement);
    if (this.$label) {
      this.renderer.addClass(this.$label, 'field__label');
      this.renderer.insertBefore(this.wrapperEl, this.$label, this.element.nativeElement);
    }
    this.messageEl = this.renderer.createElement('span');
    this.renderer.addClass(this.messageEl, 'field__error-message');
  }

  @HostListener('executeValidation') executeValidationEvent = () => {
    this.validator = this.getCustomValidators(this.ngModel);
    this.renderer.removeChild(this.wrapperEl, this.messageEl);
    const labelText = this.getLabelText();
    let message = '';
    let valid = false;

    if (this.validator.isEmpty) {
      message = this.requiredMessage || this.messages.requiredMessage;
    } else if (this.validator.isNotEqual) {
      message = this.equalToMessage || this.messages.equalToMessage;
    } else {
      valid = true;
    }

    if (!valid) {
      this.renderer.addClass(this.element.nativeElement, 'field__error');
      message = message.replace('${name}', labelText);
      this.messageEl.innerText = message;
      this.renderer.appendChild(this.wrapperEl, this.messageEl);
    } else {
      this.renderer.removeClass(this.element.nativeElement, 'field__error');
    }
    this.element.nativeElement.setAttribute('validation', valid);
  }

  protected getCustomValidators = (formValue: any): ValidationErrors => {
    return {
      ...this.validateRequired(formValue),
      ...this.validateEqualTo(formValue)
    };
  }

  protected validateRequired: ValidatorFn = (value: any): ValidationErrors | null => {
    let validation = {};
    if (!this.required) {
      return {};
    }

    if (this.required && (value == null || value === '')) {
      validation = { isEmpty: true };
    }
    return validation;
  }

  protected validateEqualTo: ValidatorFn = (value: any): ValidationErrors | null => {
    if (!this.equalTo) {
      return {};
    }

    let validation = {};
    const isNotEqual = this.equalIgnoreCase
      ? `${value}`.toLowerCase() !== `${this.equalTo}`.toLowerCase()
      : value !== this.equalTo;
    if (isNotEqual) {
      validation = { isNotEqual: true };
    }
    return validation;
  }

  protected runValidation() {
    if (this.validator.isEmpty
      || this.validator.isNotEqual) {
      return;
    }
    this.renderer.removeClass(this.element.nativeElement, 'field__error');
  }

}
