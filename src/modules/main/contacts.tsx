import { useState } from 'react'
import { Link } from 'react-router-dom'
import { type infer as zodInfer } from 'zod'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
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
import { Textarea } from '@/components/ui/textarea'
import { contactsSchema } from '@/config/validation-schemas'
import { useCustomForm } from '@/hooks'
import { useAddContactMutation } from '@/store/api/contacts/contacts'

export const Contacts = () => {
    return (
        <section
            className='mt-8 rounded-md bg-white p-6 max-sm:bg-transparent max-sm:p-0'
            id='contacts'
        >
            <div className='flex items-start gap-12 max-lg:flex-col'>
                <div className='w-full flex-1'>
                    <h2 className='text-[32px] text-primary'>Контакти</h2>
                    <div className='mt-5 grid grid-cols-[130px_repeat(auto-fit,_minmax(180px,_25%))] justify-between gap-x-6 gap-y-4 max-xs:grid-cols-1'>
                        <div className='flex flex-col items-start justify-start gap-y-0.5'>
                            <div className='text-sm text-foreground/60'>
                                Номер телефону
                            </div>

                            <Link
                                className='cursor-pointer text-primary transition-colors hover:text-accent'
                                to='tel:+380679999569'
                            >
                                067 999 95 69
                            </Link>

                            <Link
                                className='cursor-pointer text-primary transition-colors hover:text-accent'
                                to='tel:+380639999569'
                            >
                                063 999 95 69
                            </Link>

                            <Link
                                className='cursor-pointer text-primary transition-colors hover:text-accent'
                                to='tel:+380509999569'
                            >
                                050 999 95 69
                            </Link>
                        </div>
                        <div className='flex flex-col items-start justify-start gap-y-0.5'>
                            <div className='text-sm text-foreground/60'>Наша пошта</div>

                            <Link
                                className='cursor-pointer text-primary transition-colors hover:text-accent'
                                to='mailto:apexflora.ua@gmail.com'
                            >
                                apexflora.ua@gmail.com
                            </Link>
                        </div>
                        <div className='flex flex-col items-start justify-start gap-y-0.5'>
                            <div className='text-sm text-foreground/60'>Наша адреса</div>
                            м. Рівне, Дворецька 123а
                        </div>
                        <div className='flex flex-col items-start justify-start gap-y-0.5'>
                            <div className='text-sm text-foreground/60'>
                                Графік роботи
                            </div>
                            <span className='whitespace-nowrap'>
                                пн - сб 09:00 - 18:00
                            </span>
                            <span className='whitespace-nowrap'>нд 09:00 - 17:00</span>
                        </div>
                    </div>
                    <iframe
                        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2531.90924104791!2d26.227389576913996!3d50.61022397584649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472f6cca515334af%3A0x40740957ed3b6d0a!2zMTIzQSwg0LLRg9C70LjRhtGPINCU0LLQvtGA0LXRhtGM0LrQsCwgMTIz0JAsINCg0ZbQstC90LUsINCg0ZbQstC90LXQvdGB0YzQutCwINC-0LHQu9Cw0YHRgtGMLCAzMzAxNw!5e0!3m2!1suk!2sua!4v1700643350339!5m2!1suk!2sua'
                        className='mt-5 h-96 w-full rounded-md border-none max-md:h-72'
                        allowFullScreen
                        loading='lazy'
                        referrerPolicy='no-referrer-when-downgrade'
                    ></iframe>
                </div>
                <ContactsForm />
            </div>
        </section>
    )
}

type ContactFormData = zodInfer<typeof contactsSchema>

const ContactsForm = () => {
    const [openModal, setOpenModal] = useState(false)

    const form = useCustomForm(contactsSchema)

    const [addContact] = useAddContactMutation()

    const handleAddContact = (data: ContactFormData) => {
        try {
            addContact({
                name: data.name,
                email: data.email,
                phone_number: data.phone_number,
                text: data.message || ''
            }).then(() => {
                setOpenModal(true)
            })
        } catch (err) {
            console.log(err)
        }
    }

    const onSubmit = (formData: ContactFormData) => {
        handleAddContact(formData)
    }

    return (
        <div className='w-96 max-lg:w-full max-lg:max-w-full'>
            <div className='mx-auto max-w-64'>
                <h3 className='text-center text-[32px] text-primary'>
                    Зворотній зв’язок
                </h3>
                <p className='mt-2 text-center text-sm text-foreground/50'>
                    Залиште свої данні і наш менеджер зв'яжеться з вами
                </p>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='mt-5 space-y-4'
                >
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ім’я*</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Андрій'
                                        type='text'
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
                            <FormItem>
                                <FormLabel>Електронна пошта*</FormLabel>
                                <FormControl>
                                    <Input
                                        inputMode='email'
                                        type='email'
                                        placeholder='stepanenko@gmail.com'
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='phone_number'
                        render={({ field }) => (
                            <FormItem>
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
                        name='message'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Текстове повідомлення</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder='Текстове повідомлення'
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        className='w-full'
                        type='submit'
                    >
                        Надіслати
                    </Button>
                </form>
            </Form>
            {openModal ? <AddedContactModal initialOpen={openModal} /> : null}
        </div>
    )
}

const AddedContactModal = ({ initialOpen }: { initialOpen: boolean }) => {
    const [open, setOpen] = useState(initialOpen)
    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Дякуємо за заявку!</DialogTitle>
                    <DialogDescription>Наш менеджер зв’яжеться з вами</DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
