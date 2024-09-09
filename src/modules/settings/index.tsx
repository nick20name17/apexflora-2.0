import { Edit, Lock, MapPin, Plus, User } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { ChangePasswordForm } from './forms/change-password-form'
import { OrdersAddressForm } from './forms/order-address-form'
import { OrdersRecepientForm } from './forms/orders-recepient-form'
import { UserInfoForm } from './forms/user-info-form'
import { EditAddressModal, RemoveAddressModal } from './modals/address-modal'
import { EditRecepientModal, RemoveRecepientModal } from './modals/recepient-modal'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { routes } from '@/constants/routes'

export const Settings = () => {
    return (
        <div className='w-full py-4'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            <Link to={routes.main}>Головна</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Налаштування</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className='py-4'>
                <h1 className='text-[32px] font-bold text-primary'>Налаштування</h1>
            </div>
            <div className='flex flex-col gap-y-4 border-t border-t-primary pt-4'>
                <div className='flex flex-wrap items-center gap-8 rounded-md border border-secondary p-4 max-sm:flex-col max-sm:items-start'>
                    <h2 className='sr-only'>Інформація про менеджера</h2>
                    <div className='flex flex-col'>
                        <span className='text-sm text-foreground/60'>Ваш менеджер</span>
                        <span>Головний Адмін</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-sm text-foreground/60'>Номер телефону</span>
                        <Link
                            className='text-primary transition-colors hover:text-accent'
                            to='tel:+380679999569'
                        >
                            <span>067 999 95 69</span>
                        </Link>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-sm text-foreground/60'>
                            Електронна пошта
                        </span>
                        <Link
                            className='text-primary transition-colors hover:text-accent'
                            to='mailto:apexflora.ua@gmail.com'
                        >
                            <span>admin@apexflora.com.ua</span>
                        </Link>
                    </div>
                </div>
                <UserInfo />
                <OrdersRecepients />
                <OrdersAdresses />
                <ChangePassword />
            </div>
        </div>
    )
}

const UserInfo = () => {
    const [isEditing, setIsEditing] = useState(false)

    return (
        <div className='rounded-md border border-secondary p-4 max-lg:flex-col-reverse max-lg:items-start'>
            <div className='flex w-full items-center justify-between gap-x-4'>
                <h2 className='flex items-center gap-x-2 text-2xl font-bold text-primary'>
                    <User className='size-6' /> Інформація про користувача
                </h2>
                <Button
                    onClick={() => setIsEditing(!isEditing)}
                    size='icon'
                    variant='outline'
                >
                    <Edit className='size-4' />
                </Button>
            </div>
            <div className='mt-3 flex items-center justify-between gap-x-4 border-t border-t-secondary pt-3'>
                {isEditing ? (
                    <UserInfoForm />
                ) : (
                    <div className='flex w-full flex-wrap items-center justify-between gap-6 max-sm:flex-col max-sm:items-start'>
                        <div className='flex flex-col'>
                            <span className='text-sm text-foreground/60'>Ім’я</span>
                            <span>Головний</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-sm text-foreground/60'>Прізвище</span>
                            <span>Адмін</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-sm text-foreground/60'>
                                Номер телефону
                            </span>
                            <Link
                                className='text-primary transition-colors hover:text-accent'
                                to='tel:+380679999569'
                            >
                                <span>067 999 95 69</span>
                            </Link>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-sm text-foreground/60'>
                                Електронна пошта
                            </span>
                            <Link
                                className='text-primary transition-colors hover:text-accent'
                                to='mailto:apexflora.ua@gmail.com'
                            >
                                <span>admin@apexflora.com.ua</span>
                            </Link>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-sm text-foreground/60'>Компанія</span>
                            <span>Apexflora</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

const OrdersRecepients = () => {
    const [isEditing, setIsEditing] = useState(false)

    const recepientLength = 1

    return (
        <div className='rounded-md border border-secondary p-4 max-lg:flex-col-reverse max-lg:items-start'>
            <div className='flex w-full items-center justify-between gap-x-4'>
                <h2 className='flex items-center gap-x-2 text-2xl font-bold text-primary'>
                    <User className='size-6' /> Отримувач замовлень
                </h2>
                <Button
                    onClick={() => setIsEditing(!isEditing)}
                    size='icon'
                    variant='outline'
                >
                    <Plus className='size-4' />
                </Button>
            </div>
            <div className='mt-3 flex items-center justify-between gap-x-4 border-t border-t-secondary pt-3'>
                {recepientLength ? (
                    ''
                ) : (
                    <span className='font-bold text-foreground/60'>
                        Додайте отримувача замовлень
                    </span>
                )}
                {isEditing ? (
                    <OrdersRecepientForm />
                ) : (
                    <div className='flex w-full flex-col gap-y-4'>
                        <OrdersRecepient />
                    </div>
                )}
            </div>
        </div>
    )
}

const OrdersRecepient = () => {
    return (
        <div className='flex items-center justify-between gap-x-10 border-b border-b-secondary pb-3 last:border-none'>
            <div className='flex items-center gap-x-10'>
                <div className='flex flex-col'>
                    <span className='text-sm text-foreground/60'>Ім’я</span>
                    <span>Головний</span>
                </div>
                <div className='flex flex-col'>
                    <span className='text-sm text-foreground/60'>Прізвище</span>
                    <span>Адмін</span>
                </div>
                <div className='flex flex-col'>
                    <span className='text-sm text-foreground/60'>Номер телефону</span>
                    <Link
                        className='text-primary transition-colors hover:text-accent'
                        to='tel:+380679999569'
                    >
                        <span>067 999 95 69</span>
                    </Link>
                </div>
                <div className='flex flex-col'>
                    <span className='text-sm text-foreground/60'>Електронна пошта</span>
                    <Link
                        className='text-primary transition-colors hover:text-accent'
                        to='mailto:apexflora.ua@gmail.com'
                    >
                        <span>admin@apexflora.com.ua</span>
                    </Link>
                </div>
            </div>
            <div className='flex items-center gap-x-4'>
                <EditRecepientModal />
                <RemoveRecepientModal />
            </div>
        </div>
    )
}

const OrdersAdresses = () => {
    const [isEditing, setIsEditing] = useState(false)

    const recepientLength = 1

    return (
        <div className='rounded-md border border-secondary p-4 max-lg:flex-col-reverse max-lg:items-start'>
            <div className='flex w-full items-center justify-between gap-x-4'>
                <h2 className='flex items-center gap-x-2 text-2xl font-bold text-primary'>
                    <MapPin className='size-6' /> Адреси доставки
                </h2>
                <Button
                    onClick={() => setIsEditing(!isEditing)}
                    size='icon'
                    variant='outline'
                >
                    <Plus className='size-4' />
                </Button>
            </div>
            <div className='mt-3 flex items-center justify-between gap-x-4 border-t border-t-secondary pt-3'>
                {recepientLength ? (
                    ''
                ) : (
                    <span className='font-bold text-foreground/60'>
                        Додайте адресу доставки
                    </span>
                )}
                {isEditing ? (
                    <OrdersAddressForm />
                ) : (
                    <div className='flex w-full flex-col gap-y-4'>
                        <OrdersAddress />
                    </div>
                )}
            </div>
        </div>
    )
}

const OrdersAddress = () => {
    return (
        <div className='flex items-center justify-between gap-x-10 border-b border-b-secondary pb-3 last:border-none'>
            <div className='flex items-center gap-x-10'>
                <div className='flex flex-col'>
                    <span className='text-sm text-foreground/60'>Адреса магазину</span>
                    <span>Рівець, вул. Чорновола 24</span>
                </div>
            </div>
            <div className='flex items-center gap-x-4'>
                <EditAddressModal />
                <RemoveAddressModal />
            </div>
        </div>
    )
}

const ChangePassword = () => {
    const [isEditing, setIsEditing] = useState(false)

    return (
        <div className='rounded-md border border-secondary p-4 max-lg:flex-col-reverse max-lg:items-start'>
            <div className='flex w-full items-center justify-between gap-x-4'>
                <h2 className='flex items-center gap-x-2 text-2xl font-bold text-primary'>
                    <Lock className='size-6' />
                    Змінити пароль
                </h2>
                <Button
                    onClick={() => setIsEditing(!isEditing)}
                    size='icon'
                    variant='outline'
                >
                    <Plus className='size-4' />
                </Button>
            </div>
            <div className='mt-3 flex items-center justify-between gap-x-4 border-t border-t-secondary pt-3'>
                {isEditing ? <ChangePasswordForm /> : null}
            </div>
        </div>
    )
}
