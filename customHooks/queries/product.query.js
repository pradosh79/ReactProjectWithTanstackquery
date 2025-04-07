import { useMutation, useQuery } from "@tanstack/react-query"
import { Cookies } from "react-cookie";
import { useGlobalHooks } from "../globalHooks/globalhooks";
import toast from "react-hot-toast";
import { productCreateFn } from "../../api/functions/product.create";
import { productListFn } from "../../api/functions/product.list";
import { productEditFn } from "../../api/functions/product.edit";
import { productUpdateFn } from "../../api/functions/product.update";


export const productCreateMutation = () => {
    const { queryClient } = useGlobalHooks()
    const cookie = new Cookies()
    return useMutation({
        mutationFn: productCreateFn,
        onSuccess: (res) => {
            const { token, status, message,product } = res || {}
            if (status === 200 && token) {
                cookie.set("token", token, { path: "/cms/product_create", secure: true })
                localStorage.setItem("product", JSON.stringify(product))
            }
            toast.success(`${message}`);
            queryClient.invalidateQueries({ queryKey: ["PRODUCT"] })
        },
        onError:(error, variables, context)=> {
            toast.error(`${error?.response.data.message||error?.message}`);
            queryClient.invalidateQueries({ queryKey: ["PRODUCT"] })
        }
    })

}


export const productListQuery = ()=> {
  return useQuery({
    queryKey: ["PRODUCT_LIST"],
    queryFn:productListFn
  })
}

//productEditFn

export const producteditQuery=(id)=>{
    // return useQuery({
    //     queryKey:['PRODUCT_EDIT',id],
    //     queryFn:productEditFn(id)
    // });
    return useQuery({
        queryKey: ['PRODUCT_EDIT', id],
        queryFn: () => productEditFn(id), // Fix: Pass a function reference, NOT call it directly
        enabled: !!id, // Ensures query only runs when `id` is defined
    });
}

export const productupdateMutation = () => {
    const { queryClient } = useGlobalHooks()
    const cookproductCreateMutationie = new Cookies()
    return useMutation({
        mutationFn: productUpdateFn,
        onSuccess: (res) => {
            const { token, status, message,product } = res || {}
            if (status === 200 && token) {
                cookie.set("token", token, { path: "/cms/product_update", secure: true })
                localStorage.setItem("product", JSON.stringify(product))
            }
            toast.success(`${message}`);
            queryClient.invalidateQueries({ queryKey: ["PRODUCT"] })
        },
        onError:(error, variables, context)=> {
            toast.error(`${error?.response.data.message||error?.message}`);
            queryClient.invalidateQueries({ queryKey: ["PRODUCT"] })
        }
    })
}