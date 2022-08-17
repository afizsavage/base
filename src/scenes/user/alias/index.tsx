import {Box, TextFieldProps, Theme, Typography} from "@mui/material";
import CardLongLayout from "../../../common/components/Layouts/CardLongLayout";
import {FormEvent, useCallback, useState} from "react";
import MonTextField from "@monime-lab/frontend-extra/monime/MonTextField";
import MonSwitch from "@monime-lab/frontend-extra/monime/MonSwitch";
import MonButton from "@monime-lab/frontend-extra/monime/MonButton";
import {useAliasValidate} from "../../../common/hooks/validator";
import {useNavigate} from "react-router-dom";
import {useSignUpInfo} from "../../../common/components/SignUpInfoProvider";

const EmailAddressInput = (props: TextFieldProps) => {
    return (
        <MonTextField
            fullWidth
            type={"email"}
            name={'email'}
            variant={"standard"}
            autoComplete={'off'}
            placeholder={'Email address'}
            {...props}
        />
    )
}

const PhoneNumberInput = (props: TextFieldProps) => {
    return (
        <MonTextField
            fullWidth
            type={"tel"}
            name={'tel'}
            variant={"standard"}
            autoComplete={'off'}
            placeholder={'Phone number'}
            InputProps={{
                startAdornment: (
                    <Box sx={{whiteSpace: 'nowrap'}}>🇸🇱 +232 &nbsp;</Box>
                )
            }}
            {...props}
        />
    )
}

export default function Alias() {
    const navigate = useNavigate()
    const {signUpInfo, setSignUpInfo} = useSignUpInfo()
    const [isRequesting, setIsRequesting] = useState(false);
    const {isValid} = useAliasValidate(signUpInfo?.user?.alias?.type, signUpInfo?.user?.alias?.value)
    const handleTriggerVerification = useCallback(() => {
        setIsRequesting(true)
        setTimeout(() => {
            navigate("/create/user/verify", {replace: true})
            setIsRequesting(false)
        }, 3000)
    }, [navigate])
    return (
        <CardLongLayout>
            <Box component={'form'} onSubmit={(e: FormEvent<any>) => {
                e.preventDefault()
                isValid && handleTriggerVerification()
            }}>
                <Typography variant={'h3'} component={Box} sx={{mb: 2}}>Sign Up</Typography>
                {signUpInfo?.user?.alias?.type === "phone" ?
                    <PhoneNumberInput
                        disabled={isRequesting}
                        value={signUpInfo?.user?.alias?.value || ''}
                        onChange={(e) => {
                            setSignUpInfo({user: {alias: {prefix: '+232', value: e.target.value}}})
                        }}/> :
                    <EmailAddressInput
                        disabled={isRequesting}
                        value={signUpInfo?.user?.alias?.value || ''}
                        onChange={(e) => {
                            setSignUpInfo({user: {alias: {prefix: '', value: e.target.value}}})
                        }}/>}
                <Box sx={{
                    display: 'flex', flexDirection: 'row',
                    alignItems: 'center', justifyContent: 'center', mt: 2
                }}>
                    <Typography variant={"subtitle2"} sx={{
                        flex: 1, color: (theme: Theme) => theme.palette.grey["600"]
                    }}>Use phone number</Typography>
                    <MonSwitch
                        disabled={isRequesting}
                        checked={signUpInfo?.user?.alias?.type === "phone"}
                        onChange={(_, checked) => {
                            setSignUpInfo({user: {alias: {type: checked ? "phone" : "email", value: ""}}})
                        }}/>
                </Box>
                <Box sx={{mt: 5}}>
                    <MonButton
                        loading={isRequesting}
                        disabled={!isValid}
                        variant={"contained"}
                        sx={{minWidth: 180}}
                        onClick={handleTriggerVerification}
                    >
                        {isRequesting ? 'Requesting...' : 'Continue'}
                    </MonButton>
                </Box>
            </Box>
        </CardLongLayout>
    )
}