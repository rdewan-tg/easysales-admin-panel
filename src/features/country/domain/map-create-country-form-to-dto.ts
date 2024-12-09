import { CreateCountryDto } from "../data";


export const mapCreateCountryFormToDto = (form: CreateCountryDto) => {
    return {
        name: form.name,
        countryCode: form.countryCode,
        companyCode: form.companyCode,
        currencyCode: form.currencyCode,
        timeZone: form.timeZone
    }
}