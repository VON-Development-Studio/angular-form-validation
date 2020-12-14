import { ValidationMessagesModel } from './von-form-validation.model';

export const VALIDATION_MESSAGES: ValidationMessagesModel = {
  ngModelRequired: 'You need to add [(ngModel)] into the element',
  EN: {
    requiredMessage: 'The field \'${name}\' is required',
    equalToMessage: 'The field \'${name}\' is not equal'
  },
  ES: {
    requiredMessage: 'El campo \'${name}\' es requerido',
    equalToMessage: 'El campo \'${name}\' no es igual'
  },
};
