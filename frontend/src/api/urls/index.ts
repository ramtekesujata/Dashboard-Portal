
import { BASE_URL } from "../base-urls";

export const LOGIN_URL=BASE_URL + "/auth/login/"//request type-POST
export const LOGOUT_URL=BASE_URL+"/auth/logout/"//request type-POST
export const REGISTER_URL=BASE_URL+'/auth/register/'//request type-POST
export const DETAILS_URL=BASE_URL+'/dashboard/details/'//request type-GET
export const PASS_FAIL_URL=BASE_URL+'/dashboard/failandpass/'//request type-GET
export const RESULTS_URL=BASE_URL+'/dashboard/results/'//request type-GET
export const LOCATION_LIST_URL=BASE_URL+'/dashboard/list/'//request type-GET