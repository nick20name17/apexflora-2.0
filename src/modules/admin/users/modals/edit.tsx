import { Loader2, Pencil } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { BonusSelect } from '../bonus-select'
import { ManagerSelect } from '../manager-select'
import { RoleSelect } from '../role-select'

import { CitySelect } from '@/components/shared/city-select'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { editUserSchema } from '@/config/validation-schemas'
import { useCustomForm } from '@/hooks/use-custom-form'
import { usePatchUserMutation } from '@/store/api/users/users'
import type { User } from '@/store/api/users/users.types'

type UserFormValues = Zod.infer<typeof editUserSchema>

interface EditUserProps {
    user: User
}

export const EditUserModal = ({ user }: EditUserProps) => {
    const [open, setOpen] = useState(false)

    const [patchUser, { isLoading }] = usePatchUserMutation()

    const handlePatchUser = (data: UserFormValues) => {
        try {
            patchUser({
                data: {
                    ...data,
                    bonus_program: +data.bonus_program,
                    service_manager: +data.service_manager,
                    city: data.city.name
                },
                id: user.id
            }).then(() => {
                toast.success(`Користувача ${data.first_name} успішно відредаговано`)
                setOpen(false)
            })
        } catch (error) {
            toast.error('Щось пішло не так')
        }
    }

    const form = useCustomForm(editUserSchema, {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_number: user.phone_number,
        company: user.company,
        position: user.position,
        role: 'client',
        bonus_program: user.bonus_program?.id.toString() || '',
        service_manager: user.service_manager?.id.toString() || '',
        code_1c: user.code_1c,
        is_active: user.is_active,
        city: {
            ref: '',
            name: user.city || ''
        },
        is_deleted: user.is_deleted
    })

    const onUserEdit = (formData: UserFormValues) => {
        handlePatchUser(formData)
    }

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button size='icon'>
                    <Pencil className='size-4' />
                </Button>
            </DialogTrigger>
            <DialogContent className='mx-2 max-w-[800px] rounded-md'>
                <DialogHeader className='text-left'>
                    <DialogTitle>
                        Редагувати користувача {user.first_name + ' ' + user.last_name}
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        className='space-y-4'
                        onSubmit={form.handleSubmit(onUserEdit)}
                    >
                        <div className='flex flex-wrap items-center gap-4'>
                            <FormField
                                control={form.control}
                                name='first_name'
                                render={({ field }) => (
                                    <FormItem className='min-w-40 flex-1'>
                                        <FormLabel>Ім'я</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Андрій'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='last_name'
                                render={({ field }) => (
                                    <FormItem className='min-w-40 flex-1'>
                                        <FormLabel>Прізвище</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Степаненко'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='city'
                                render={({ field }) => (
                                    <FormItem className='min-w-40 flex-1'>
                                        <FormLabel>Місто</FormLabel>
                                        <FormControl>
                                            <CitySelect
                                                className='w-full'
                                                city={field.value}
                                                setCity={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='flex flex-wrap items-center gap-4 border-b border-b-primary pb-4'>
                            <FormField
                                control={form.control}
                                name='phone_number'
                                render={({ field }) => (
                                    <FormItem className='min-w-40 flex-1'>
                                        <FormLabel>Номер телефону</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='tel'
                                                inputMode='tel'
                                                placeholder='38 067 999 95 69'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem className='min-w-40 flex-1'>
                                        <FormLabel>Електронна пошта</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='email'
                                                inputMode='email'
                                                placeholder='nickname@gmail.com'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='role'
                                render={({ field }) => (
                                    <FormItem className='min-w-40 flex-1'>
                                        <FormLabel>Роль</FormLabel>
                                        <FormControl>
                                            <RoleSelect
                                                role={field.value}
                                                setRole={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className='flex flex-wrap items-center gap-4 border-b border-b-primary pb-4'>
                            <FormField
                                control={form.control}
                                name='company'
                                render={({ field }) => (
                                    <FormItem className='min-w-40 flex-1'>
                                        <FormLabel>Компанія</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Flowers Shop'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='position'
                                render={({ field }) => (
                                    <FormItem className='min-w-40 flex-1'>
                                        <FormLabel>Посада</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Менеджер'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className='flex flex-wrap items-center gap-4 border-b border-b-primary pb-4'>
                            <FormField
                                control={form.control}
                                name='bonus_program'
                                render={({ field }) => (
                                    <FormItem className='min-w-40 flex-1'>
                                        <FormLabel>Бонусна програма</FormLabel>
                                        <FormControl>
                                            <BonusSelect
                                                bonusProgram={field.value}
                                                setBonusProgram={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='service_manager'
                                render={({ field }) => (
                                    <FormItem className='min-w-40 flex-1'>
                                        <FormLabel>Відповідальний менеджер</FormLabel>
                                        <FormControl>
                                            <ManagerSelect
                                                manager={field.value}
                                                setManager={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className='flex flex-wrap items-end gap-4'>
                            <FormField
                                control={form.control}
                                name='code_1c'
                                render={({ field }) => (
                                    <FormItem className='min-w-40 flex-1'>
                                        <FormLabel>Код 1С</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='ss-4-b-13'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='is_active'
                                render={({ field }) => (
                                    <FormItem className='flex h-10 w-56 flex-row items-center space-x-3 space-y-0 rounded-md border px-3 py-2'>
                                        <FormControl>
                                            <>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                                <FormLabel>
                                                    {field.value
                                                        ? 'Активувати аккаунт'
                                                        : 'Деактивувати аккаунт'}
                                                </FormLabel>
                                            </>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button
                            disabled={isLoading}
                            type='submit'
                            size='sm'
                            className='w-48'
                        >
                            {isLoading ? (
                                <Loader2 className='size-4 animate-spin' />
                            ) : (
                                'Редагувати користувача'
                            )}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
