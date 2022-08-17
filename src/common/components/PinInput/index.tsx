import PinInput2 from 'react-pin-input';
import {useTheme} from "@mui/material";

export default function PinInput(props: {
    disabled?: boolean,
    onChange?: (pin: string) => any
    onComplete?: (pin: string) => any
}) {
    const theme = useTheme()
    return (
        <PinInput2
            autoSelect
            length={4}
            initialValue={""}
            focus={!props.disabled}
            disabled={props.disabled}
            onComplete={props.onComplete}
            onChange={(v) => props.onChange?.(v)}
            style={{
                display: 'flex',
                flexDirection: "row",
            }}
            inputStyle={{
                borderWidth: 2,
                borderRadius: 8,
                fontSize: '18px',
                marginRight: 15,
                borderColor: theme.palette.grey["500"],

            }}
            inputFocusStyle={{borderColor: theme.palette.primary.main}}/>
    )
}