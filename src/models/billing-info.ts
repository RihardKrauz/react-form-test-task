import {CountryItem} from "./country-item";
import {BillingDetails} from "./billing-details";

export interface BillingInfo {
    countries: CountryItem[];
    data: BillingDetails;
}
