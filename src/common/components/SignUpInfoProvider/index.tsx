import React, {createContext, useContext, useMemo, useState} from "react";
import {SignUpInfo} from "../../@types";
import {deepMerge, PartialDeep} from "@monime-lab/twater";

const SignUpInfoContext = createContext<{
    signUpInfo?: SignUpInfo,
    setSignUpInfo: (info: PartialDeep<SignUpInfo & { replace?: boolean }>) => any,
}>({
    setSignUpInfo: () => {
    }
})

export default function SignUpInfoProvider(props: {
    children: React.ReactNode
}) {
    const [signUpInfo, setSignUpInfo] = useState<SignUpInfo>({});
    const setSignUpInfo2 = useMemo(() => {
        return (info: PartialDeep<SignUpInfo & { replace?: boolean }>) => {
            setSignUpInfo(info.replace ? {} : deepMerge(signUpInfo, info))
        }
    }, [signUpInfo])
    return (
        <SignUpInfoContext.Provider value={{
            signUpInfo, setSignUpInfo: setSignUpInfo2,
        }}>
            {props.children}
        </SignUpInfoContext.Provider>
    )
}

export const useSignUpInfo = () => {
    return useContext(SignUpInfoContext)
}