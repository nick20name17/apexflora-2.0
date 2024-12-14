import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface StepperInputProps {
    min?: number
    max?: number
    step?: number
    defaultValue?: number
    onChange?: (value: number) => void
    disabled?: boolean
}

export const StepperInput = ({
    min = 0,
    max = 100,
    step = 1,
    defaultValue = min,
    onChange,
    disabled = false
}: StepperInputProps) => {
    const [value, setValue] = useState(defaultValue)

    const roundToStep = (numValue: number) => {
        const roundedValue = Math.round((numValue - min) / step) * step + min
        return Math.max(min, Math.min(roundedValue, max))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let numValue = parseInt(e.target.value, 10)

        if (isNaN(numValue)) numValue = min

        const correctedValue = roundToStep(numValue)

        setValue(correctedValue)
        onChange?.(correctedValue)
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

    return (
        <div className='flex items-center space-x-2'>
            <Button
                variant='ghost'
                size='icon'
                onClick={handleDecrement}
                disabled={value <= min || disabled}
            >
                <Minus className='size-4' />
            </Button>
            <Input
                className='h-10 w-20 bg-transparent text-center'
                type='number'
                value={value}
                onChange={handleChange}
                disabled={disabled}
                min={min}
                max={max}
                step={step}
            />
            <Button
                variant='ghost'
                size='icon'
                onClick={handleIncrement}
                disabled={value >= max || disabled}
            >
                <Plus className='size-4' />
            </Button>
        </div>
    )
}
