import { Directive, ElementRef, EventEmitter, HostListener, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[validate]'
})
export class VonFormValidateDirective implements OnInit {

  @Output('validate')
  customSubmit: EventEmitter<any> = new EventEmitter();

  protected isValid?: boolean;
  protected isFocused?: boolean;

  constructor(protected el: ElementRef) { }

  ngOnInit(): void { }

  @HostListener('submit', ['$event'])
  onSubmitEvent = (e: any) => {
    e.preventDefault();
    const elements = this.el.nativeElement.querySelectorAll('[validation]');
    this.isValid = true;
    this.isFocused = false;

    elements.forEach((el: HTMLElement) => {
      el.dispatchEvent(new Event('executeValidation'));
      const elValid = el.getAttribute('validation') === 'true';
      if (this.isValid) {
        this.isValid = elValid;
      }

      if (!elValid && !this.isFocused) {
        this.isFocused = true;
        el.focus();
      }
    });

    if (this.isValid) {
      this.customSubmit.emit(e);
    }
  }

}
