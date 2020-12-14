export interface ValidationMessagesLocalizationModel {
  requiredMessage: string;
  equalToMessage: string;
}

export interface ValidationMessagesModel {
  ngModelRequired: string;
  EN: ValidationMessagesLocalizationModel;
  ES: ValidationMessagesLocalizationModel;
}
