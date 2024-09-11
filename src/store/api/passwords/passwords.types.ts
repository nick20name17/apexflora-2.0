export interface PasswordReset {
    email: string
}
export interface PasswordResetResponse {
    message: string
}

export interface NewPasswordData {
    new_password1: string
    new_password2: string
}
export interface PasswordResetConfirmData extends NewPasswordData {
    token: string
    uidb64: string
}

export interface PasswordChangeData extends NewPasswordData {
    old_password: string
}

export interface PasswordChange {
    id: number
    data: PasswordChangeData
}
