
// activity log
export const getActivityLogsEndpoint: string = "/v1/api/activity-logs";
export const createActivityLogEndpoint: string = "/v1/api/activity-logs";
// auth
export const loginEndpoint: string = "/v1/api/admin/auth/login";
export const checkAuthStateEndpoint: string = "/v1/api/admin/auth/check";
export const getMyRolesEndpoint: string = "/v1/api/admin/roles/my-roles";
export const logoutEndpoint: string = "/v1/api/admin/auth/logout";
// company
export const getCompaniesEndpoint: string = "/v1/api/company";
export const createCompanyEndpoint: string = "/v1/api/company";
// country
export const getCountriesEndpoint: string = "/v1/api/admin/countries";
export const createCountryEndpoint: string = "/v1/api/admin/countries";
// device setting
export const getDeviceSettingsEndpoint: string = "/v1/api/admin/device-setting";
export const getDeviceSettingByIdEndpoint: string = "/v1/api/admin/device-setting";
export const findByDeviceIdEndpoint: string = "/v1/api/device-setting/find";
export const createDeviceSettingEndpoint: string = "/v1/api/admin/device-setting";
export const updateDeviceSettingEndpoint: string = "/v1/api/admin/device-setting";
export const deleteDeviceSettingEndpoint: string = "/v1/api/admin/device-setting";
// user-admin
export const getUsersEndpoint: string = "/v1/api/admin/users";
export const getUsersByCompanyEndpoint: string = "/v1/api/admin/users";
export const getUserByIdEndpoint: string = "/v1/api/admin/users";
export const createUserEndpoint: string = "/v1/api/admin/users";
export const updateUserEndpoint: string = "/v1/api/admin/users/:id";
export const deleteUserEndpoint: string = "/v1/api/admin/users";
export const changeCompanyEndpoint: string = "/v1/api/admin/users/change-company";
// me
export const getMeEndpoint: string = "/v1/api/me";
// role
export const getRolesEndpoint: string = "/v1/api/admin/roles";
export const setUserRolesEndpoint: string = "/v1/api/admin/users/set-user-role";
export const deleteUserRoleEndpoint: string = "/v1/api/admin/users/delete-user-role";
// photo
export const getPhotosEndpoint: string = "/v1/api/merchandiser/photos";
export const getPhotosByDeviceIdEndpoint: string = "/v1/api/merchandiser/photos/find-by-device-and-date";
export const getPhotosByFromToDateEndpoint: string = "/v1/api/merchandiser/photos/find-by-from-and-to-date";
export const getPhotosByCustomerChainEndpoint: string = "/v1/api/merchandiser/photos/find-by-customer-chain-and-date";
export const getPhotoDevicesEndpoint: string = "/v1/api/merchandiser/photos/devices";
// address
export const getCustomerAddressEndpoint: string = "/v1/api/addresses";
// customers
export const getCustomersEndpoint: string = "/v1/api/customers";
export const getMerchandiserCustomersEndpoint: string = "/v1/api/merchandiser-customers";
// items 
export const getItemsEndpoint: string = "/v1/api/items";
// price 
export const getPricesEndpoint: string = "/v1/api/prices";
// report
export const getSiteVisitReportByDateRangeEndpoint: string = "/v1/api/merchandiser/photos/report/site-visit-report-by-date-range";
export const getPhotoTransDatesEndpoint: string = "/v1/api/merchandiser/photos/trans-dates";
export const getPhotoCustomerChainsEndpoint: string = "/v1/api/merchandiser/photos/customer-chains";

