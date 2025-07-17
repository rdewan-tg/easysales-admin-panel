import { axiosAdminInstance, getSiteVisitListEndpoint } from "@/core/data";
import { SiteVisitDto } from "../dto/site-visit.dto";


export const getSiteVisits = async () => {
    const response = await axiosAdminInstance.get<SiteVisitDto>(getSiteVisitListEndpoint, {
        params: {
            fromDate: new Date().toISOString(),
            toDate: new Date().toISOString()
        }
    });
    return response.data;
}
