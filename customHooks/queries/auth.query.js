import { useMutation, useQuery } from "@tanstack/react-query"
import { Cookies } from "react-cookie";
import { useGlobalHooks } from "../globalHooks/globalhooks";
import toast from "react-hot-toast";
import { userCreateFn } from "../../api/functions/register";
import { userLoginFn } from "../../api/functions/login";
import { userverify_otpFn } from "../../api/functions/verify_otp";
import { userpassword_updateFn } from "../../api/functions/update.password";
import { userForgotpasswordFn } from "../../api/functions/forgot.password";


export const userCreateMutation = () => {
    const { queryClient } = useGlobalHooks()
    const cookie = new Cookies()
    return useMutation({
        mutationFn: userCreateFn,
        onSuccess: (res) => {
            const { token, status, message,user } = res || {}
            if (status === 200 && token) {
                cookie.set("token", token, { path: "/cms/registration", secure: true })
                localStorage.setItem("user", JSON.stringify(user))
            }
            toast.success(`${message}`);
            queryClient.invalidateQueries({ queryKey: ["USER"] })
        },
        onError:(error, variables, context)=> {
            toast.error(`${error?.response.data.message||error?.message}`);
            queryClient.invalidateQueries({ queryKey: ["USER"] })
        }
    })

}

export const userLoginMutation = () => {
    const { queryClient } = useGlobalHooks()
    const cookie = new Cookies()
    return useMutation({
        mutationFn: userLoginFn,
        onSuccess: (res) => {
            const { token, success, message,user } = res || {}
            //console.log(token);
            if (success == true && token) {
                cookie.set("token", token, { path: "/cms/registration", secure: true })
                localStorage.setItem("token", token, { path: "/cms/registration", secure: true })
                localStorage.setItem("user_id", user._id)
                localStorage.setItem('user_email',user.email)
                localStorage.setItem("token", token)
            }
            toast.success(`${message}`);
            queryClient.invalidateQueries({ queryKey: ["USER"] })
        },
        onError:(error, variables, context)=> {
            toast.error(`${error?.response.data.message||error?.message}`);
            queryClient.invalidateQueries({ queryKey: ["USER"] })
        }
    })
}

export const userRegistration_verifyMutation = () => {
    const { queryClient } = useGlobalHooks()
    const cookie = new Cookies()
    return useMutation({
        mutationFn: userverify_otpFn,
        onSuccess: (res) => {
            const { token, status, message,user } = res || {}
            if (status === 200 && token) {
                cookie.set("token", token, { path: "/cms/registration", secure: true })
                localStorage.setItem("user", JSON.stringify(user))
            }
            toast.success(`${message}`);
            queryClient.invalidateQueries({ queryKey: ["USER"] })
        },
        onError:(error, variables, context)=> {
            toast.error(`${error?.response.data.message||error?.message}`);
            queryClient.invalidateQueries({ queryKey: ["USER"] })
        }
    })
}

//

export const userpassword_verifyMutation = () => {
    const { queryClient } = useGlobalHooks()
    //const cookie = new Cookies()
    return useMutation({
        mutationFn: userpassword_updateFn,
        onSuccess: (res) => {
            const { token, status, message,user } = res || {}
            if (status === 200 && token) {
                cookie.set("token", token, { path: "/cms/registration", secure: true })
                localStorage.setItem("user", JSON.stringify(user))
            }
            toast.success(`${message}`);
            queryClient.invalidateQueries({ queryKey: ["USER"] })
        },
        onError:(error, variables, context)=> {
            toast.error(`${error?.response.data.message||error?.message}`);
            queryClient.invalidateQueries({ queryKey: ["USER"] })
        }
    })
}

export const userforgot_passwordMutation = () => {
    const { queryClient } = useGlobalHooks()
    //const cookie = new Cookies()
    return useMutation({
        mutationFn: userForgotpasswordFn,
        onSuccess: (res) => {
            const { token, status, message,user } = res || {}
            if (status === 200 && token) {
                cookie.set("token", token, { path: "/cms/registration", secure: true })
                localStorage.setItem("user", JSON.stringify(user))
            }
            toast.success(`${message}`);
            queryClient.invalidateQueries({ queryKey: ["USER"] })
        },
        onError:(error, variables, context)=> {
            toast.error(`${error?.response.data.message||error?.message}`);
            queryClient.invalidateQueries({ queryKey: ["USER"] })
        }
    })
}