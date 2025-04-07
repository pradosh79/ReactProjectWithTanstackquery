import axiosInstance from "../axios/axios"
import { endPoints } from "../endpoints/endpoints"

export const userLoginFn = async (payload) => {
    const res = await axiosInstance.post(endPoints.auth.login, payload)
    console.log(res, "userLogin")
    return res.data
}