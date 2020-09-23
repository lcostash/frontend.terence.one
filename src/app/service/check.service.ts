import {Injectable} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Injectable()
export class CheckService {
  constructor() {
  }

  /**
   * @param control AbstractControl
   * @return object|null
   */
  public static emailValidator(control: AbstractControl): { badEmail: boolean } {
    const pattern = /^[a-zA-Z0-9_]+[a-zA-Z0-9\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-]+$/;
    return control.value ? (control.value.match(pattern) ? null : {badEmail: true}) : null;
  }

  /**
   * @param control AbstractControl
   * @return object|null
   */
  public static nameValidator(control: AbstractControl): { badName: boolean } {
    const pattern = /[^\W\d_]+$/;
    return control.value ? (control.value.match(pattern) ? null : {badName: true}) : null;
  }

  /**
   * @param control AbstractControl
   * @return object|null
   */
  public static passwordValidator(control: AbstractControl): { badPassword: boolean } {
    const pattern = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])^\S{8,}/;
    return control.value ? (control.value.match(pattern) ? null : {badPassword: true}) : null;
  }

  /**
   * @param control AbstractControl
   * @return object|null
   */
  public static stringValidator(control: AbstractControl): { badString: boolean } {
    const pattern = /^[a-zA-Z ]+$/;
    return control.value && (typeof control.value !== 'object') ?
      (control.value.match(pattern) ? null : {badString: true}) : null;
  }

  /**
   * @param control AbstractControl
   * @return object|null
   */
  public static numberValidator(control: AbstractControl): { badNumber: boolean } {
    const pattern = /^\d+$/;
    return control.value && (typeof control.value !== 'object') ?
      (control.value.toString().match(pattern) ? null : {badNumber: true}) : null;
  }

  /**
   * @param control AbstractControl
   * @return object|null
   */
  public static amountValidator(control: AbstractControl): { badAmount: boolean } {
    const pattern = /^\d+(\d{3})*(\.\d{1,2})?$/;
    return control.value && (typeof control.value !== 'object') ?
      (control.value.toString().match(pattern) ? null : {badAmount: true}) : null;
  }

  /**
   * @param control AbstractControl
   * @return object|null
   */
  public static tokenValidator(control: AbstractControl): { badToken: boolean } {
    const pattern = /^[a-zA-Z0-9.]+$/;
    return control.value && (typeof control.value !== 'object') ?
      (control.value.match(pattern) ? null : {badToken: true}) : null;
  }

  /**
   * @param control AbstractControl
   * @return object|null
   */
  public static uuidValidator(control: AbstractControl): { badUuid: boolean } {
    const pattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return control.value && (typeof control.value !== 'object') ?
      (control.value.match(pattern) ? null : {badUuid: true}) : null;
  }

  /**
   * @param name string Name of validation rule
   * @param value any The input value
   * @return string
   */
  public message(name: string, value?: any): string {
    const fields = {
      required: 'This field is required',
      minlength: `Minimum length ${value.requiredLength}`,
      maxlength: `Maximum length ${value.requiredLength}`,
      min: `Minimum value must to be ${value.min}`,
      max: `Maximum value must to be ${value.max}`,
      badEmail: 'Invalid format, please use email address here',
      badPassword: 'Your password contain at least one capital letter and one number',
      badName: 'It is look like a invalid name',
      badNumber: 'It is look like an invalid number',
      badAmount: 'It is look like a invalid amount',
      badString: 'Here we accept the chars only',
      badToken: 'It is look like a invalid token',
      badUuid: 'It is look like a invalid uuid',
    };

    return fields[name];
  }
}
