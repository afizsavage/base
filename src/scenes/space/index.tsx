import React, {FormEvent} from "react";
import {Box, Theme, Typography} from "@mui/material";
import MonButton from "@monime-lab/frontend-extra/monime/MonButton";
import MonTextField from "@monime-lab/frontend-extra/monime/MonTextField";
import CardLongLayout from "../../common/components/Layouts/CardLongLayout";

export default function Space() {
    return (
        <CardLongLayout>
            <Box component={'form'} onSubmit={(e: FormEvent<any>) => {
                e.preventDefault()
            }}>
                <Typography variant={"h4"} sx={{
                    fontSize: "20px",
                    lineHeight: "22px",
                    mb: 2
                }}>
                    Create your space!
                </Typography>
                <Box>
                    <MonTextField
                        fullWidth
                        name={'spaceName'}
                        variant={"standard"}
                        autoComplete={'off'}
                        label={'Space name'}
                    />
                </Box>
                <Box sx={{mt: 3.5, mb: 3.5}}>
                    <MonTextField
                        fullWidth
                        error={true}
                        variant={"standard"}
                        autoComplete={'off'}
                        label={'Space alias'}
                        helperText={'Already in use'}
                    />
                    <Typography
                        variant={"subtitle2"}
                        sx={{
                            color: (theme: Theme) => theme.palette.success.dark,
                        }}
                    >
                        https://<b>{"clubhouse"}</b>.monime.space
                    </Typography>
                </Box>
                <MonButton
                    disabled={false}
                    variant={"contained"}
                    sx={{minWidth: 180, mt: 2}}
                    onClick={() => alert('Creating space....')}
                >
                    Create
                </MonButton>
            </Box>
        </CardLongLayout>
    )
}