import {BillingDetails} from "./billing-details";

type ValidationRules = {
    [K in keyof BillingDetails]?: ((value: string) => string | null)[];
}

export const validationRules: ValidationRules = {
    name: [
        (value) => !/\w.+\s.+/.test(value) ? 'Please enter your full name' : null
    ],
    company: [
        (value) => !(value && value.length >= 3) ? 'Minimum 3 symbols' : null
    ],
    zip_code: [
        (value) => !(value && value.length >= 3) ? 'Minimum 3 symbols' : null
    ],
    address: [
        (value) => !(value && value.length >= 7) ? 'Minimum 7 symbols' : null
    ],
}
