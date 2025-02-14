import axiosInstance from "../axios/axios"
import { endPoints } from "../endpoints/endpoints"

export const productEditFn = async (payload) => {
    const res = await axiosInstance.post(endPoints.cms.productDetails, payload)
    console.log(res, "productEdit")
    return res.data
}