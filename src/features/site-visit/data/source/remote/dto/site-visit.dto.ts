

export interface SiteVisitDto {
    status: string;
    data: SiteVisitData[];
    
}

export interface SiteVisitData {
    id: number;
    userId: number,
    deviceId: number,
    salesPersonCode: string,
    salesPersonName: string,
    customerId: string,
    customerName: string,
    customerAddress: string,
    customerChain: string | null,
    customerLatitude: number,
    customerLongitude: number,    
    timeIn: Date,
    timeOut: Date,
    durationInOutlet: number,
    areaIds: number[] | [],
    companyId: number,
    createdAt: Date,
    updatedAt: Date,
}