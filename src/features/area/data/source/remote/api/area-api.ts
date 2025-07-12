
import { CreateAreaDto } from "../dto/create-area.dto";
import { axiosAdminInstance, createAreaEndpoint, createManyAreaEndpoint, deleteAreaEndpoint, getAreaByIdEndpoint, getAreasEndpoint, updateAreaEndpoint } from "@/core/data";
import { UpdateAreaDto } from "../dto/update-area.dto";
import { AreaDeleteDto, AreaDto, AreasDto } from "../dto/area.dto";

export const createArea = async (createAreaDto: CreateAreaDto) => {
    const response = await axiosAdminInstance.post<AreaDto>(createAreaEndpoint, createAreaDto);
    return response.data;
};

export const createManyArea = async (createAreaDto: CreateAreaDto[]) => {
    const response = await axiosAdminInstance.post(createManyAreaEndpoint, createAreaDto);
    return response.data;
};

export const updateArea = async (updateAreaDto: UpdateAreaDto) => {
    const response = await axiosAdminInstance.patch<AreaDto>(updateAreaEndpoint, updateAreaDto);
    return response.data;
};

export const getAreaById = async (id: number) => {
    const response = await axiosAdminInstance.get<AreaDto>(`${getAreaByIdEndpoint}/${id}`);
    return response.data;
};

export const getAreas = async () => {
    const response = await axiosAdminInstance.get<AreasDto>(getAreasEndpoint);
    return response.data;
};

export const deleteArea = async (id: number) => {
    const response = await axiosAdminInstance.delete<AreaDeleteDto>(`${deleteAreaEndpoint}/${id}`);
    return response.data;
};
