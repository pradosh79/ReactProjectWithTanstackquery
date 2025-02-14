import axiosInstance from "../axios/axios"
import { endPoints } from "../endpoints/endpoints"

export const productUpdateFn = async (payload) => {
    const res = await axiosInstance.post(endPoints.cms.productUpdate, payload)
    console.log(res, "productUpdate")
    return res.data
}