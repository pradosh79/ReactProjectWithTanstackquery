import axiosInstance from "../axios/axios"
import { endPoints } from "../endpoints/endpoints"

export const userverify_otpFn = async (payload) => {
    const res = await axiosInstance.post(endPoints.auth.verify_otp, payload)
    console.log(res, "userCreate")
    return res.data
}