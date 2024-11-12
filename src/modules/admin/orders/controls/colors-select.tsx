import { AddColorModal } from '../../colors/modals/add'

import { MultiSelect } from '@/components/ui/multi-select'
import { useGetAllColorsQuery } from '@/store/api/colors/colors'

interface ColorSelectProps {
    colors: string[]
    setColors: (colors: string[]) => void
}
export const ColorsSelect = ({ colors, setColors }: ColorSelectProps) => {
    const { data } = useGetAllColorsQuery({})

    const colorsOptions =
        data?.map((color) => ({
            label: color.name,
            value: color.id.toString()
        })) || []

    return (
        <div className='flex items-center gap-x-2'>
            <MultiSelect
                modalPopover
                maxCount={2}
                defaultValue={colors}
                options={colorsOptions}
                onValueChange={setColors}
                placeholder='Оберіть кольори'
                animation={0}
            />
            <AddColorModal size='icon' />
        </div>
    )
}
