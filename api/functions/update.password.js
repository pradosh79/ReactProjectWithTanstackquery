import axiosInstance from "../axios/axios"
import { endPoints } from "../endpoints/endpoints"

export const userpassword_updateFn = async (payload) => {
    const res = await axiosInstance.post(endPoints.auth.update_password, payload)
    console.log(res, "userpassword")
    return res.data
}