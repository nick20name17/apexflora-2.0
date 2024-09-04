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

export const emailSchema = object({
    email: string({
        required_error: "Це поле є обов'язковим"
    })
        .min(1, "Це поле є обов'язковим")
        .email({
            message: 'Введіть коректну електронну пошту'
        })
})

export const signInSchema = object({
    ...emailSchema.shape,
    ...passwordSchema
})

export const signUpSchema = object({
    ...emailSchema.shape,
    ...passwordSchema,
    first_name: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    last_name: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    city: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    phone: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим")
})

export const contactsSchema = object({
    name: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    email: string({
        required_error: "Це поле є обов'язковим"
    })
        .min(1, "Це поле є обов'язковим")
        .email({
            message: 'Введіть коректну електронну пошту'
        }),
    phone: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    message: string({
        required_error: 'Це поле є рядковим'
    }).optional()
})
