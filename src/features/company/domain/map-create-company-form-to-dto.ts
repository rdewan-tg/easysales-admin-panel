import { CreateCompanyForm } from "./create-company-form";

export const mapCreateCompanyFormToDto = (form: CreateCompanyForm) => {
  return {
    name: form.name,
    address: form.address,
    email: form.email,
    phone: form.phone,
    countryId: form.countryId,
    companyCode: form.companyCode,
    companySetting: {
      timeZone: form.companySetting.timeZone,
      currencyCode: form.companySetting.currencyCode,
    },
  };
};
