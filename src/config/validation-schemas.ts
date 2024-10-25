import { object, string } from 'zod'

export const passwordSchema = object({
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
})

const newPasswordSchema = object({
    new_password1: string({
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
        ),
    new_password2: string().min(1, 'Підведження паролю необхідне')
})

export const changePasswordSchema = object({
    old_password: string({
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
        ),
    ...newPasswordSchema.shape
}).refine((data) => data.new_password1 === data.new_password2, {
    message: 'Паролі не співпадають',
    path: ['new_password2']
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

export const signInSchema = object({
    ...emailSchema.shape,
    ...passwordSchema.shape
})

export const signUpSchema = object({
    ...emailSchema.shape,
    ...passwordSchema.shape,
    first_name: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    last_name: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    city: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    phone_number: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим")
})

export const userInfoSchema = object({
    ...emailSchema.shape,
    first_name: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    last_name: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    position: string({
        required_error: "Це поле є обов'язковим"
    }),
    company: string({
        required_error: "Це поле є обов'язковим"
    }),
    phone_number: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим")
})

export const ordersCoworkerSchema = object({
    ...emailSchema.shape,
    first_name: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    last_name: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    phone_number: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим")
})

export const ordersAddressSchema = object({
    city: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    street: string({
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
    phone_number: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    message: string({
        required_error: 'Це поле є рядковим'
    }).optional()
})

export const addOrderSchema = object({
    username: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    phone_number: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    address: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    recepient: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим")
})

export const colorSchema = object({
    name: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    hex: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим")
})
