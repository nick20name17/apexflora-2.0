import { array, boolean, date, literal, object, string, union } from 'zod'

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

export const producerSchema = object({
    name: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    country: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим")
})

export const discountSchema = object({
    name: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    percentage: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    start_date: date({
        required_error: "Це поле є обов'язковим"
    }),
    end_date: date({
        required_error: "Це поле є обов'язковим"
    })
})

export const categoriesSchema = object({
    name: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    parent: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим")
})

export const bonusLimitsSchema = object({
    accumulation_limit: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    discount: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим")
})

export const bonusProgramsSchema = object({
    title: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    default: boolean({
        required_error: "Це поле є обов'язковим"
    }),
    limits: array(string()).min(1, 'Оберіть хоча б один ліміт')
})

export const userSchema = object({
    ...userInfoSchema.shape,
    role: union([literal('admin'), literal('manager'), literal('client')]),
    code_1c: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    bonus_program: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    service_manager: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    city: object({
        ref: string({
            required_error: "Це поле є обов'язковим"
        }).min(1, "Це поле є обов'язковим"),
        name: string({
            required_error: "Це поле є обов'язковим"
        }).min(1, "Це поле є обов'язковим")
    }).refine((data) => data.ref && data.name, {
        message: "Це поле є обов'язковим"
    }),
    ...passwordSchema.shape
})

export const editUserSchema = object({
    ...userInfoSchema.shape,
    role: union([literal('admin'), literal('manager'), literal('client')]),
    code_1c: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    bonus_program: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    service_manager: string({
        required_error: "Це поле є обов'язковим"
    }).min(1, "Це поле є обов'язковим"),
    city: object({
        ref: string({
            required_error: "Це поле є обов'язковим"
        }).min(1, "Це поле є обов'язковим"),
        name: string({
            required_error: "Це поле є обов'язковим"
        }).min(1, "Це поле є обов'язковим")
    }).refine((data) => data.ref && data.name, {
        message: "Це поле є обов'язковим"
    }),
    is_active: boolean({
        required_error: "Це поле є обов'язковим"
    }),
    is_deleted: boolean({
        required_error: "Це поле є обов'язковим"
    })
})
