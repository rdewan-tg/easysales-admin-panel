import { SiteVisitData } from "../../data/source/remote/dto/site-visit.dto";


export type SiteVisitState = { 
    siteVisits: SiteVisitData[];
    isLoading: boolean;
    error: string | null;
    getSiteVisits: () => Promise<void>;
}