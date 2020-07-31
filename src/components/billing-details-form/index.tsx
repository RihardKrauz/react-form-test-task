import React, {useState, useContext, SyntheticEvent, useMemo, useCallback} from 'react';
import './styles.scss';
import {NotificationContext} from '../notification';
import {Form, Button, DropdownItemProps, DropdownProps} from 'semantic-ui-react';
import {useHttpGetRequest, useHttpPostRequest, useRequestOnInit} from '../../utils/http';
import {BillingInfo} from "../../models/billing-info";
import {CountryItem} from "../../models/country-item";
import {useFormControl} from "../../utils/forms";
import {BillingDetails} from "../../models/billing-details";
import {selectedCountryInEuList} from "../../utils/eu-countries";
import {validationRules} from "../../models/billing-details-validation";

const urlGetBillingInfo = 'http://127.0.0.1:1337/billing_info';
const urlSaveBillingInfo = 'http://127.0.0.1:1337/save';

function mapStringToDropdownItem(value: string): DropdownItemProps {
    return {key: value, value, text: value};
}

type BillingDetailsFormProps = {
    onSuccess: () => void;
}

interface BillingFormDictionaries {
    countries: CountryItem[];
}

const BillingDetailsForm: React.FC<BillingDetailsFormProps> = ({ onSuccess }) => {
    const [countries, setCountries] = useState<CountryItem[]>([]);
    const [states, setStates] = useState<DropdownItemProps[]>([]);
    const [loading, setLoading] = useState(true);

    const formProps = {loading};

    const [name, onChangeName, nameError] = useFormControl('', validationRules.name);
    const [company, onChangeCompany, companyError] = useFormControl('', validationRules.company);
    const [country, onChangeCountry, countryError] = useFormControl('');
    const [vat, onChangeVat, vatError] = useFormControl('', []);
    const [city, onChangeCity, cityError] = useFormControl('', []);
    const [zip_code, onChangeZip, zipError] = useFormControl('', validationRules.zip_code);
    const [address, onChangeAddress, addressError] = useFormControl('', validationRules.address);
    const [state, onChangeState, stateError] = useFormControl('', []);

    const notificationService = useContext(NotificationContext);
    const [postData] = useHttpPostRequest();

    useRequestOnInit<BillingInfo>(useHttpGetRequest, applyBillingInfoData, handleException, urlGetBillingInfo);

    function applyBillingInfoData(billingInfo: BillingInfo | undefined) {
        setLoading(false);

        if (!billingInfo) { return; }

        setCountries(billingInfo.countries);
        setInitFormValues(billingInfo.data, { countries: billingInfo.countries });
    };

    function handleException(ex: string) {
        setLoading(false);
        console.error(ex);
        notificationService?.showErrorMessage('Error on getting billing info');
    };

    function setInitFormValues(values: BillingDetails, dictionaries: BillingFormDictionaries) {
        onChangeName(values.name);
        onChangeCompany(values.company);
        setCountryFromList(values.country, dictionaries.countries);
        onChangeCity(values.city);
        onChangeVat(values.vat);
        onChangeStateSelect(null, { value: values.state });
        onChangeZip(values.zip_code);
        onChangeAddress(values.address);
    }

    function saveDetails(e: any) {
        e.preventDefault();

        if (isFormInvalid()) {
            return;
        }

        const formDataToSave: BillingDetails = { name, company, country, vat, city, zip_code, address, state };

        setLoading(true);
        postData(urlSaveBillingInfo, formDataToSave).then(() => {
            setLoading(false);
            notificationService?.showSuccessMessage('Billing details has been successfully saved');
            onSuccess();
        }).catch(() => {
            setLoading(false);
            notificationService?.showErrorMessage('Error while saving data');
        });
    }

    function isFormInvalid() {
        return nameError || companyError || countryError || vatError || cityError || zipError || addressError || stateError;
    }

    const setCountryFromList = useCallback((value: string | undefined, countryList: CountryItem[]) => {
        const country = countryList.find(c => c.country === value);
        setStates(country ? country.states.map(mapStringToDropdownItem) : []);
        onChangeCountry(value);
        onChangeVat('');
    }, [onChangeCountry, onChangeVat]);

    const onChangeCountrySelect = useCallback((e: SyntheticEvent<HTMLElement, Event> | null, { value }: DropdownProps) => {
        setCountryFromList(value as string, countries);
    }, [setCountryFromList, countries]);

    const onChangeStateSelect = useCallback((e: SyntheticEvent<HTMLElement, Event> | null, { value }: DropdownProps) => {
        onChangeState(value);
    }, [onChangeState]);

    const countriesSelectOptions = useMemo(() => {
        return countries.map(c => mapStringToDropdownItem(c.country));
    }, [countries]);

    return (<section className='billing-details-form-wrapper'>
        <h2>Billing Details</h2>
        <Form {...formProps} onSubmit={saveDetails}>
            <Form.Input
                className='form-field--size-3'
                label='Customer Full Name'
                placeholder='e.g. John Smith'
                value={name}
                error={nameError}
                onChange={onChangeName}
            />
            <Form.Input
                className='form-field--size-3'
                label='Company Name'
                placeholder='e.g. AppFollow'
                value={company}
                error={companyError}
                onChange={onChangeCompany}
            />
            <Form.Group>
                <Form.Select
                    className='form-field--size-2 form-field--select'
                    label='Country'
                    value={country}
                    options={countriesSelectOptions}
                    onChange={onChangeCountrySelect}
                />
                {selectedCountryInEuList(country) && <Form.Input
                    className='form-field--size-2'
                    label='VAT ID'
                    placeholder='e.g. 4'
                    required
                    value={vat}
                    error={vatError}
                    onChange={onChangeVat}
                />}
            </Form.Group>
            <Form.Group>
                <Form.Input
                    className='form-field--size-2'
                    label='City'
                    placeholder='e.g. Moscow'
                    value={city}
                    error={cityError}
                    onChange={onChangeCity}
                />
                <Form.Select
                    className='form-field--size-2'
                    label='State'
                    value={state}
                    options={states}
                    onChange={onChangeStateSelect}
                />
            </Form.Group>
            <Form.Input
                className='form-field--size-3'
                label='Zip Code'
                placeholder='e.g. 55111'
                value={zip_code}
                error={zipError}
                onChange={onChangeZip}
            />
            <Form.TextArea
                className='form-field--size-3'
                label='Address'
                placeholder='e.g. 240 Iroquois Ave.'
                value={address}
                error={addressError}
                onChange={onChangeAddress}
            />
            <Button primary>Go to Checkout</Button>
        </Form>
    </section>);
}

export default BillingDetailsForm;
