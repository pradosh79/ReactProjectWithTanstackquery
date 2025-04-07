import axiosInstance from "../axios/axios"
import { endPoints } from "../endpoints/endpoints"

export const userCreateFn = async (payload) => {
    const res = await axiosInstance.post(endPoints.auth.registration, payload)
    console.log(res, "userCreate")
    return res.data
}