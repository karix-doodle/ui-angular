import { FormGroup, Validators } from '@angular/forms';

/**
 * Convert to camelcase sting
 * @param data sting
 */
export function toCamelCase(data) {
    return data.substring(0, 1).toUpperCase() + data.substring(1);
};

export function addValidators(form: FormGroup, key: string) {
    form.get(key).setValidators([Validators.required]);
    form.get(key).updateValueAndValidity();
}

export function removeValidators(form: FormGroup, key: string) {
    form.get(key).clearValidators();
    form.get(key).updateValueAndValidity();
}