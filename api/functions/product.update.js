import axiosInstance from "../axios/axios"
import { endPoints } from "../endpoints/endpoints"

export const productUpdateFn = async ([payload,id]) => {
    const res = await axiosInstance.post(`${endPoints.cms.productUpdate}/${id}`, payload)

    //
    console.log(res, "productUpdate")
    return res.data
}