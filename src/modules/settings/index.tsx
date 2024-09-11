import { Edit, Lock, MapPin, Plus, User } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { ChangePasswordForm } from './forms/change-password-form'
import { DeliverAddressForm } from './forms/deliver-address-form'
import { OrdersCoworkerForm } from './forms/orders-coworker-form'
import { UserInfoForm } from './forms/user-info-form'
import { EditAddressModal, RemoveAddressModal } from './modals/address-modal'
import { EditCoworkerModal, RemoveCoworkerModal } from './modals/coworker-modal'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from '@/components/ui/collapsible'
import { Skeleton } from '@/components/ui/skeleton'
import { routes } from '@/constants/routes'
import { useGetCoworkersQuery } from '@/store/api/coworkers/coworkers'
import type { Coworker } from '@/store/api/coworkers/coworkers.types'
import { useGetDeliverAddressQuery } from '@/store/api/deliver-address/deliver-address'
import type { DeliverAddress } from '@/store/api/deliver-address/deliver-address.types'
import { useAppSelector } from '@/store/hooks/hooks'
import { selectUser } from '@/store/slices/auth'

export const Settings = () => {
    const userManager = useAppSelector(selectUser)?.service_manager

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
                        <span>
                            {userManager?.first_name + ' ' + userManager?.last_name}
                        </span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-sm text-foreground/60'>Номер телефону</span>
                        <Link
                            className='text-primary transition-colors hover:text-accent'
                            to='tel:+380679999569'
                        >
                            <span>{userManager?.phone_number}</span>
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
                            <span>{userManager?.email}</span>
                        </Link>
                    </div>
                </div>
                <UsersInfo />
                <OrdersCoworkers />
                <DeliverAddress />
                <ChangePassword />
            </div>
        </div>
    )
}

const UsersInfo = () => {
    const [open, setOpen] = useState(false)

    const user = useAppSelector(selectUser)!

    return (
        <Collapsible
            open={open}
            onOpenChange={setOpen}
            className='rounded-md border border-secondary p-4 max-lg:flex-col-reverse max-lg:items-start'
        >
            <CollapsibleTrigger className='flex w-full items-center justify-between gap-x-4'>
                <h2 className='flex items-center gap-x-2 text-2xl font-bold text-primary'>
                    <User className='size-6' /> Інформація про користувача
                </h2>
                <Button
                    onClick={() => setOpen(!open)}
                    size='icon'
                    variant='outline'
                >
                    <Edit className='size-4' />
                </Button>
            </CollapsibleTrigger>
            <div className='mt-3 border-t border-t-secondary pt-3'>
                {open ? null : <UserInfo />}
                <CollapsibleContent>
                    <UserInfoForm
                        user={user}
                        setOpen={setOpen}
                    />
                </CollapsibleContent>
            </div>
        </Collapsible>
    )
}

const UserInfo = () => {
    const user = useAppSelector(selectUser)

    return (
        <div className='flex w-full flex-wrap items-center justify-between gap-6 max-sm:flex-col max-sm:items-start'>
            <div className='flex flex-col'>
                <span className='text-sm text-foreground/60'>Ім’я</span>
                <span>{user?.first_name}</span>
            </div>
            <div className='flex flex-col'>
                <span className='text-sm text-foreground/60'>Прізвище</span>
                <span>{user?.last_name}</span>
            </div>
            <div className='flex flex-col'>
                <span className='text-sm text-foreground/60'>Номер телефону</span>
                <Link
                    className='text-primary transition-colors hover:text-accent'
                    to='tel:+380679999569'
                >
                    <span>{user?.phone_number}</span>
                </Link>
            </div>
            <div className='flex flex-col'>
                <span className='text-sm text-foreground/60'>Електронна пошта</span>
                <Link
                    className='text-primary transition-colors hover:text-accent'
                    to='mailto:apexflora.ua@gmail.com'
                >
                    <span>{user?.email}</span>
                </Link>
            </div>
            <div className='flex flex-col'>
                <span className='text-sm text-foreground/60'>Компанія</span>
                <span>{user?.company}</span>
            </div>
        </div>
    )
}

const OrdersCoworkers = () => {
    const [open, setOpen] = useState(false)

    const userId = useAppSelector(selectUser)?.id!

    const { data, isLoading } = useGetCoworkersQuery({
        creator: userId
    })

    const userCoworkers = data?.results || []

    return (
        <Collapsible
            open={open}
            onOpenChange={setOpen}
            className='rounded-md border border-secondary p-4 max-lg:flex-col-reverse max-lg:items-start'
        >
            <CollapsibleTrigger className='flex w-full items-center justify-between gap-x-4'>
                <h2 className='flex items-center gap-x-2 text-2xl font-bold text-primary'>
                    <User className='size-6' /> Отримувач замовлень
                </h2>
                <Button
                    onClick={() => setOpen(!open)}
                    size='icon'
                    variant='outline'
                >
                    <Plus className='size-4' />
                </Button>
            </CollapsibleTrigger>
            <div className='mt-3 border-t border-t-secondary pt-3'>
                {open ? null : (
                    <div className='flex w-full flex-col gap-y-4'>
                        {isLoading ? (
                            <>
                                <Skeleton className='h-[44px] w-full rounded-md' />
                            </>
                        ) : (
                            userCoworkers?.map((coworker) => (
                                <OrdersCoworker
                                    key={coworker.id}
                                    coworker={coworker}
                                />
                            ))
                        )}
                    </div>
                )}
                {userCoworkers?.length || isLoading ? (
                    ''
                ) : (
                    <div className='h-[44px] font-bold text-foreground/60'>
                        Додайте отримувача замовлень
                    </div>
                )}
                <CollapsibleContent>
                    <OrdersCoworkerForm setOpen={setOpen} />
                </CollapsibleContent>
            </div>
        </Collapsible>
    )
}

const OrdersCoworker = ({ coworker }: { coworker: Coworker }) => {
    return (
        <div className='flex items-center justify-between gap-x-10 border-b border-b-secondary pb-3 last:border-none last:pb-0'>
            <div className='flex items-center gap-x-10'>
                <div className='flex flex-col'>
                    <span className='text-sm text-foreground/60'>Ім’я</span>
                    <span>{coworker.first_name}</span>
                </div>
                <div className='flex flex-col'>
                    <span className='text-sm text-foreground/60'>Прізвище</span>
                    <span>{coworker.last_name}</span>
                </div>
                <div className='flex flex-col'>
                    <span className='text-sm text-foreground/60'>Номер телефону</span>
                    <Link
                        className='text-primary transition-colors hover:text-accent'
                        to='tel:+380679999569'
                    >
                        <span>{coworker.phone_number}</span>
                    </Link>
                </div>
                <div className='flex flex-col'>
                    <span className='text-sm text-foreground/60'>Електронна пошта</span>
                    <Link
                        className='text-primary transition-colors hover:text-accent'
                        to='mailto:apexflora.ua@gmail.com'
                    >
                        <span>{coworker.email}</span>
                    </Link>
                </div>
            </div>
            <div className='flex items-center gap-x-4'>
                <EditCoworkerModal coworker={coworker} />
                <RemoveCoworkerModal coworker={coworker} />
            </div>
        </div>
    )
}

const DeliverAddress = () => {
    const [open, setOpen] = useState(false)

    const userId = useAppSelector(selectUser)?.id!

    const { data, isLoading } = useGetDeliverAddressQuery({
        creator: userId
    })

    const deliverAddress = data?.results || []

    return (
        <Collapsible
            open={open}
            onOpenChange={setOpen}
            className='rounded-md border border-secondary p-4 max-lg:flex-col-reverse max-lg:items-start'
        >
            <CollapsibleTrigger className='flex w-full items-center justify-between gap-x-4'>
                <h2 className='flex items-center gap-x-2 text-2xl font-bold text-primary'>
                    <MapPin className='size-6' /> Адреси доставки
                </h2>
                <Button
                    onClick={() => setOpen(!open)}
                    size='icon'
                    variant='outline'
                >
                    <Plus className='size-4' />
                </Button>
            </CollapsibleTrigger>
            <div className='mt-3 border-t border-t-secondary pt-3'>
                {deliverAddress.length || isLoading ? (
                    ''
                ) : (
                    <div className='h-[44px] font-bold text-foreground/60'>
                        Додайте адресу доставки
                    </div>
                )}

                {open ? null : (
                    <div className='flex w-full flex-col gap-y-4'>
                        {isLoading ? (
                            <>
                                <Skeleton className='h-[44px] w-full rounded-md' />
                            </>
                        ) : (
                            deliverAddress?.map((deliverAddress) => (
                                <OrdersAddress
                                    key={deliverAddress.id}
                                    deliverAddress={deliverAddress}
                                />
                            ))
                        )}
                    </div>
                )}
                <CollapsibleContent>
                    <DeliverAddressForm setOpen={setOpen} />
                </CollapsibleContent>
            </div>
        </Collapsible>
    )
}

const OrdersAddress = ({ deliverAddress }: { deliverAddress: DeliverAddress }) => {
    return (
        <div className='flex items-center justify-between gap-x-10 border-b border-b-secondary pb-3 last:border-none last:pb-0'>
            <div className='flex items-center gap-x-10'>
                <div className='flex flex-col'>
                    <span className='text-sm text-foreground/60'>Адреса магазину</span>
                    <span>{deliverAddress.city + ', ' + deliverAddress.street}</span>
                </div>
            </div>
            <div className='flex items-center gap-x-4'>
                <EditAddressModal deliverAddress={deliverAddress} />
                <RemoveAddressModal deliverAddress={deliverAddress} />
            </div>
        </div>
    )
}

const ChangePassword = () => {
    const [open, setOpen] = useState(false)

    return (
        <Collapsible
            open={open}
            onOpenChange={setOpen}
            className='rounded-md border border-secondary p-4 max-lg:flex-col-reverse max-lg:items-start'
        >
            <CollapsibleTrigger className='flex w-full items-center justify-between gap-x-4'>
                <h2 className='flex items-center gap-x-2 text-2xl font-bold text-primary'>
                    <Lock className='size-6' />
                    Змінити пароль
                </h2>
                <Button
                    onClick={() => setOpen(!open)}
                    size='icon'
                    variant='outline'
                >
                    <Plus className='size-4' />
                </Button>
            </CollapsibleTrigger>
            <div className='mt-3 border-t border-t-secondary pt-3'>
                <CollapsibleContent>
                    <ChangePasswordForm setOpen={setOpen} />
                </CollapsibleContent>
            </div>
        </Collapsible>
    )
}
