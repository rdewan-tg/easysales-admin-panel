import { CompanySetting } from "@/common/dtos";

export interface CreateCompanyDto {
  name: string;
  address: string;
  email: string;
  phone: string;
  countryId: string;
  companyCode: string;
  companySetting: CompanySetting;
}

export interface CompanySettingDto {
  timeZone: string;
  currencyCode: string;
}
