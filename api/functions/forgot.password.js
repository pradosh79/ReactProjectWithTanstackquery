import axiosInstance from "../axios/axios"
import { endPoints } from "../endpoints/endpoints"

export const userForgotpasswordFn = async (payload) => {
    const res = await axiosInstance.post(endPoints.auth.forget_password, payload)
    console.log(res, "forget_password")
    return res.data
}