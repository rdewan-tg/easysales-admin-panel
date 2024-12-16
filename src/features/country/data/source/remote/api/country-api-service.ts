import { axiosAdminInstance } from "@/core/data";
import { CountryDto } from "../dto/country.dto";
import { CreateCountryDto } from "../dto/create-country.dto";


export const getCountries = async () => {
    const response = await axiosAdminInstance.get<CountryDto>('/api/v1/admin/countries');
    return response.data;
}

export const createCountry = async (data: CreateCountryDto) => {
    const response = await axiosAdminInstance.post<any>('/api/v1/admin/countries', data);
    return response.data;
}