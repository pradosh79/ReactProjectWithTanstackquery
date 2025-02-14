import axiosInstance from "../axios/axios"
import { endPoints } from "../endpoints/endpoints"

export const productCreateFn = async (payload) => {
    const res = await axiosInstance.post(endPoints.cms.productCreate, payload)
    console.log(res, "productCreate")
    return res.data
}