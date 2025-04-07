import axiosInstance from "../axios/axios"
import { endPoints } from "../endpoints/endpoints"

export const productEditFn = async (id) => {
    const res = await axiosInstance.get(`${endPoints.cms.productDetails}/${id}`)
    console.log(res, "productEdit")
    return res.data
}