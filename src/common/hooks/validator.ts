import {useEffect, useState} from "react";

export const useAliasValidate = (type?: "email" | "phone", alias?: string) => {
    const {isValid: isEmailValid} = useEmailValidate(alias)
    const {isValid: isPhoneValid} = usePhoneValidate(alias)
    return {isValid: type === 'phone' ? isPhoneValid : isEmailValid}
}

export const useEmailValidate = (email?: string) => {
    email = email?.trim()
    const [isValid, setIsValid] = useState(false);
    useEffect(() => {
        setIsValid(/^[a-z\d]+@[a-z]+\.[a-z]{2,3}$/g.test(email || ''))
    }, [email]);
    return {isValid}
}

export const usePhoneValidate = (phone?: string) => {
    phone = phone?.trim()
    const [isValid, setIsValid] = useState(false);
    useEffect(() => {
        setIsValid(/^\d{8}$/g.test(phone || ''))
    }, [phone]);
    return {isValid}
}