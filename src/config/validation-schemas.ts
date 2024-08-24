import { object, string } from 'zod'

const passwordSchema = {
    password: string({
        required_error: "Це поле є обов'язковим"
    })
        .min(1, "Це поле є обов'язковим")
        .min(8, 'Пароль повинен містити не менше 8 символів')
        .regex(/[a-z]/, 'Пароль повинен містити не менше однієї малої літери')
        .regex(/[A-Z]/, 'Пароль повинен містити не менше однієї великої літери')
        .regex(/[0-9]/, 'Пароль повинен містити не менше однієї цифри')
        .regex(
            /[!@#$%^&*]/,
            'Пароль повинен містити не менше одного спеціального символу (!@#$%^&*)'
        )
}

export const loginSchema = object({
    email: string({
        required_error: "Це поле є обов'язковим"
    })
        .min(1, "Це поле є обов'язковим")
        .email({
            message: 'Введіть коректну електронну пошту'
        }),
    ...passwordSchema
})

export const emailSchema = object({
    email: string({
        required_error: "Це поле є обов'язковим"
    })
        .min(1, "Це поле є обов'язковим")
        .email({
            message: 'Введіть коректну електронну пошту'
        })
})
