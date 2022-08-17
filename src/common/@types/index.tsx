export interface SignUpInfo {
    space?: {
        name?: string
        alias?: string
    }
    user?: {
        alias?: {
            value?: string
            prefix?: string,
            type: 'email' | 'phone'
            verificationCode?: string
        },
        profile?: {
            firstName?: string
            lastName?: string
        }
    },
}

export const formatUserAliasValue = (info?: SignUpInfo) => {
    let {type, prefix = '', value = ''} = info?.user?.alias || {}
    return type === 'phone' ? (prefix + value)?.replace(
        /(.{4})(\d{2})(\d{3})(\d{3})/,
        '$1-$2-$3-$4') : prefix + value
}