import { FormGroup } from '@angular/forms';

/**
 * Valida e verifica se dois form fields são iguais
 * É utilizado na parte de confirmar password e é passado
 * como parámetros os fields da palavra-passe
 * @param controlName 
 * @param matchingControlName 
 */
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}