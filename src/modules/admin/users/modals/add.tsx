import { CirclePlus, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { BonusSelect } from '../bonus-select'
import { ManagerSelect } from '../manager-select'
import { RoleSelect } from '../role-select'

import { CitySelect } from '@/components/shared/city-select'
import { Button } from '@/components/ui/button'
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
import { PasswordWithReveal } from '@/components/ui/password-with-reveal'
import { userSchema } from '@/config/validation-schemas'
import { useCustomForm } from '@/hooks/use-custom-form'
import { useGetBonusProgramsQuery } from '@/store/api/bonuses/bonuses'
import { useAddUserMutation } from '@/store/api/users/users'

type UserFormValues = Zod.infer<typeof userSchema>

interface AddUserModalProps {
    size?: 'sm' | 'icon'
}

export const AddUserModal = ({ size = 'sm' }: AddUserModalProps) => {
    const [open, setOpen] = useState(false)

    const [addUser, { isLoading }] = useAddUserMutation()

    const { data: bonusPrograms } = useGetBonusProgramsQuery({
        limit: 100,
        offset: 0
    })

    const form = useCustomForm(userSchema, {
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        company: '',
        position: '',
        role: 'client',
        bonus_program:
            bonusPrograms?.results
                .find((item) => item.title === 'default')
                ?.id.toString() || '',
        service_manager: '',
        code_1c: '',
        password: '',
        city: {
            ref: '',
            name: ''
        }
    })

    const handleAddUser = (data: UserFormValues) => {
        try {
            addUser({
                ...data,
                bonus_program: +data.bonus_program,
                service_manager: +data.service_manager,
                city: data.city.name
            }).then(() => {
                toast.success(
                    `Клієнта ${data.first_name + ' ' + data.last_name} успішно додано`
                )
                setOpen(false)
                form.reset()
            })
        } catch (error) {
            toast.error('Щось пішло не так')
        }
    }

    const onUserEdit = (formData: UserFormValues) => {
        handleAddUser(formData)
    }

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button
                    className='flex-shrink-0 gap-x-2'
                    size={size}
                >
                    <CirclePlus />
                    {size === 'icon' ? '' : ' Додати нового користувача'}
                </Button>
            </DialogTrigger>
            <DialogContent className='mx-2 max-w-[800px] rounded-md'>
                <DialogHeader className='text-left'>
                    <DialogTitle>Додати користувача </DialogTitle>
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

                        <div className='flex flex-wrap items-center gap-4'>
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
                                name='password'
                                render={({ field }) => (
                                    <FormItem className='min-w-40 flex-1'>
                                        <FormLabel>Пароль</FormLabel>
                                        <FormControl>
                                            <PasswordWithReveal {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button
                            disabled={isLoading}
                            type='submit'
                            size='sm'
                            className='w-40'
                        >
                            {isLoading ? (
                                <Loader2 className='size-4 animate-spin' />
                            ) : (
                                'Додати користувача'
                            )}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
