import { CompanySetting } from "@/common/dtos";


export interface CreateCompanyDto {
    name: string,
    address: string,
    email: string,
    phone: string,
    country: string,
    countryCode: string,
    companyCode: string,
    companySetting: CompanySetting,
}

export interface CompanySettingDto {   
    timeZone: string,
    currencyCode: string,
}