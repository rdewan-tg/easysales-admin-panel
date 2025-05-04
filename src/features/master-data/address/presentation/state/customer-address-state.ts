import { CustomerAddress } from "../../data";

export type CustomerAddressState = {
  isLoading: boolean;
  addresses: CustomerAddress[];
  error: string | null;
  getCustomerAddress: (dataAreaId: string, page: number, size: number) => Promise<void>;
  importFromAzureDb: () => Promise<void>;
};
