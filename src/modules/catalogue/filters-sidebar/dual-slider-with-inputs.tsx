import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { DualSlider } from '@/components/ui/dual-slider'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface DualSliderProps extends React.ComponentProps<typeof DualSlider> {
    min: number
    max: number
    value: number[]
    setValue: (value: number[]) => void
}

export const DualSliderWithInputs = ({
    min,
    max,
    value,
    setValue,
    minStepsBetweenThumbs,
    className,
    step
}: DualSliderProps) => {
    const [minValue, setMinValue] = useState<string | number>(value[0])
    const [maxValue, setMaxValue] = useState<string | number>(value[1])

    const handleValueChange = (newValues: number[]) => {
        setMinValue(newValues[0])
        setMaxValue(newValues[1])
    }

    const onSubmitValues = () => {
        setValue([+minValue, +maxValue])
    }

    const stepValue = minStepsBetweenThumbs ? minStepsBetweenThumbs * step : step

    const isMinValueValid = +minValue < min
    const isMaxValueValid = +maxValue > max

    const isMinValueGreaterThanMaxValue = +minValue + stepValue > +maxValue

    const isMinValueDivisibleByStep = +minValue % step === 0
    const isMaxValueDivisibleByStep = +maxValue % step === 0

    const isValid =
        isMinValueValid ||
        isMaxValueValid ||
        isMinValueGreaterThanMaxValue ||
        !isMinValueDivisibleByStep ||
        !isMaxValueDivisibleByStep

    return (
        <div className={cn(className)}>
            <DualSlider
                min={min}
                onValueChange={handleValueChange}
                formatLabel={() => ''}
                max={max}
                minStepsBetweenThumbs={minStepsBetweenThumbs}
                step={step}
                value={value}
            />
            <div className='flex items-center gap-x-2'>
                <Input
                    type='number'
                    onChange={(e) => setMinValue(e.target.value)}
                    className={cn(
                        'h-10 w-16 flex-1',
                        isMinValueValid ? 'border-red-500' : ''
                    )}
                    value={minValue}
                    min={min}
                    max={value[1] - 1}
                    placeholder={'-'}
                />
                <Input
                    type='number'
                    onChange={(e) => setMaxValue(e.target.value)}
                    className={cn(
                        'h-10 w-16 flex-1',
                        isMaxValueValid ? 'border-red-500' : ''
                    )}
                    value={maxValue}
                    min={value[0] + 1}
                    max={max}
                    placeholder={'-'}
                />
                <Button
                    onClick={onSubmitValues}
                    size='icon'
                    className='transition-opacity'
                    disabled={isValid}
                >
                    Ок
                </Button>
            </div>
        </div>
    )
}
