import { CirclePlus, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { AddBonusLimitsModal } from '../../bonus-limits/modals/add'

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
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { MultiSelect } from '@/components/ui/multi-select'
import { bonusProgramsSchema } from '@/config/validation-schemas'
import { useCustomForm } from '@/hooks/use-custom-form'
import {
    useAddBonusProgramMutation,
    useGetBonusLimitsQuery
} from '@/store/api/bonuses/bonuses'

type BonusProgramsFormValues = Zod.infer<typeof bonusProgramsSchema>

interface AddBonusProgramsModalProps {
    size?: 'icon' | 'sm'
}

export const AddBonusProgramsModal = ({ size = 'sm' }: AddBonusProgramsModalProps) => {
    const [open, setOpen] = useState(false)

    const [addBonusPrograms, { isLoading }] = useAddBonusProgramMutation()

    const { data: bonusLimits } = useGetBonusLimitsQuery({
        limit: 100
    })

    const bonusLimitsOptions =
        bonusLimits?.results?.map((limit) => ({
            label: limit.accumulation_limit + ' ₴' + ' - ' + limit.discount + '%',
            value: limit.id.toString()
        })) || []

    const form = useCustomForm(bonusProgramsSchema, {
        default: false,
        limits: [],
        title: ''
    })

    const handleAddBonusPrograms = (data: BonusProgramsFormValues) => {
        try {
            addBonusPrograms({
                ...data,
                limits: data.limits.map((limit) => +limit)
            }).then(() => {
                toast.success(`Бонусну програму ${data.title} успішно додано`)
                setOpen(false)
                form.reset()
            })
        } catch (error) {
            toast.error('Щось пішло не так')
        }
    }

    const onBonusProgramsAdd = (formData: BonusProgramsFormValues) => {
        handleAddBonusPrograms(formData)
    }

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button
                    className='flex items-center gap-x-2'
                    size={size}
                >
                    <CirclePlus className='size-4' />
                    {size === 'icon' ? '' : 'Додати бонусну програму'}
                </Button>
            </DialogTrigger>
            <DialogContent className='mx-2 rounded-md'>
                <DialogHeader className='text-left'>
                    <DialogTitle>Додати бонусну програму</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        className='space-y-4'
                        onSubmit={form.handleSubmit(onBonusProgramsAdd)}
                    >
                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Назва бонусної програми</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Бонусна програма за замовчуванням'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='limits'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Бонусні ліміти (один або декілька варіантів)
                                    </FormLabel>
                                    <div className='flex items-center gap-x-2'>
                                        <FormControl className=''>
                                            <MultiSelect
                                                modalPopover
                                                maxCount={2}
                                                options={bonusLimitsOptions}
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                placeholder='Оберіть бонусні ліміти'
                                                animation={0}
                                            />
                                        </FormControl>
                                        <AddBonusLimitsModal size='icon' />
                                    </div>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='default'
                            render={({ field }) => (
                                <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>

                                    <div className='space-y-1 leading-none'>
                                        <FormLabel>
                                            Бонусна програма за замовчуванням
                                        </FormLabel>
                                        <FormDescription>
                                            Бонусна програма за замовчуванням буде додана
                                            при створенні або реєстрації нового
                                            користувача
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <Button
                            disabled={isLoading}
                            type='submit'
                            size='sm'
                            className='w-60'
                        >
                            {isLoading ? (
                                <Loader2 className='size-4 animate-spin' />
                            ) : (
                                'Додати бонусну програму'
                            )}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
