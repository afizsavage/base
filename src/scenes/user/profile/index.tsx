import React, {FormEvent, useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Typography} from "@mui/material";
import MonTextField from "@monime-lab/frontend-extra/monime/MonTextField";
import MonButton from "@monime-lab/frontend-extra/monime/MonButton";
import {useSignUpInfo} from "../../../common/components/SignUpInfoProvider";
import CardLongLayout from "../../../common/components/Layouts/CardLongLayout";

export default function Profile() {
    const navigate = useNavigate()
    const {signUpInfo, setSignUpInfo} = useSignUpInfo()
    const valid = signUpInfo?.user?.profile?.firstName && signUpInfo?.user?.profile?.lastName
    const handleContinue = useCallback(() => {
        if (!valid) {
            return
        }
        navigate("/create/space")
    }, [valid, navigate])
    return (
        <CardLongLayout>
            <Box component={'form'} onSubmit={(e: FormEvent<any>) => {
                e.preventDefault()
                handleContinue()
            }}>
                <Typography variant={"h4"} sx={{
                    lineHeight: "22px",
                    fontSize: "20px",
                    mb: 2
                }}>
                    Welcome to Monime!
                </Typography>
                <Box>
                    <MonTextField
                        fullWidth
                        name={'firstName'}
                        variant={"standard"}
                        autoComplete={'off'}
                        label={'First name'}
                        value={signUpInfo?.user?.profile?.firstName}
                        onChange={(e) => setSignUpInfo({user: {profile: {firstName: e.target.value}}})}
                    />
                </Box>
                <Box sx={{mt: 4, mb: 4}}>
                    <MonTextField
                        fullWidth
                        name={'lastName'}
                        label={'Last name'}
                        variant={"standard"}
                        autoComplete={'off'}
                        value={signUpInfo?.user?.profile?.lastName}
                        onChange={(e) => setSignUpInfo({user: {profile: {lastName: e.target.value}}})}
                    />
                </Box>
                <MonButton
                    disabled={!valid}
                    variant={"contained"}
                    onClick={handleContinue}
                    sx={{minWidth: 180, mt: 2}}
                >
                    Continue
                </MonButton>
            </Box>
        </CardLongLayout>
    )
}