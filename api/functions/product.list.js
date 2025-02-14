import axiosInstance from "../axios/axios"
import { endPoints } from "../endpoints/endpoints"

export const productListFn = async () => {
    const res = await axiosInstance.get(endPoints.cms.productList)
    console.log(res, "productList")
    return res.data
}