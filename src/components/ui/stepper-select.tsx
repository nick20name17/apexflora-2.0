import { Minus, Plus } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

interface StepperSelectProps {
    min?: number
    max?: number
    step?: number
    defaultValue?: number
    onChange?: (value: number) => void
    disabled?: boolean
}

export const StepperSelect = ({
    min = 0,
    max = 100,
    step = 1,
    defaultValue = min,
    onChange,
    disabled = false
}: StepperSelectProps) => {
    const [value, setValue] = useState(defaultValue)

    const handleChange = (newValue: string) => {
        const numValue = parseInt(newValue, 10)
        setValue(numValue)
        onChange?.(numValue)
    }

    const handleIncrement = () => {
        const newValue = Math.min(value + step, max)
        setValue(newValue)
        onChange?.(newValue)
    }

    const handleDecrement = () => {
        const newValue = Math.max(value - step, min)
        setValue(newValue)
        onChange?.(newValue)
    }

    const options = useMemo(() => {
        const opts = []
        for (let i = min; i <= max; i += step) {
            opts.push(i)
        }
        return opts
    }, [min, max, step])

    return (
        <div className='flex items-center space-x-2'>
            <Button
                variant='ghost'
                size='icon'
                onClick={handleDecrement}
                disabled={value <= min || disabled}
                aria-label='Decrease value'
            >
                <Minus className='h-4 w-4' />
            </Button>
            <Select
                disabled={disabled}
                value={value.toString()}
                onValueChange={handleChange}
            >
                <SelectTrigger className='w-20 bg-transparent'>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem
                            key={option}
                            value={option.toString()}
                        >
                            {option}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Button
                variant='ghost'
                size='icon'
                onClick={handleIncrement}
                disabled={value >= max || disabled}
                aria-label='Increase value'
            >
                <Plus className='h-4 w-4' />
            </Button>
        </div>
    )
}
