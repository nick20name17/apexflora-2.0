import { AddBonusProgramsModal } from '../bonus-program/modals/add'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { useGetBonusProgramsQuery } from '@/store/api/bonuses/bonuses'

interface BonusSelecttProps {
    bonusProgram: string
    setBonusProgram: (bonusProgram: string) => void
}
export const BonusSelect = ({ bonusProgram, setBonusProgram }: BonusSelecttProps) => {
    const { data: bonusPrograms } = useGetBonusProgramsQuery({
        limit: 100,
        offset: 0
    })

    const bonusProgramsOptions =
        bonusPrograms?.results?.map((bonusProgram) => ({
            label: bonusProgram.title,
            value: bonusProgram.id.toString()
        })) || []

    return (
        <div className='flex items-center gap-x-2'>
            <Select
                defaultValue={bonusProgram}
                onValueChange={setBonusProgram}
            >
                <SelectTrigger>
                    <SelectValue placeholder='Оберіть бонусну програму' />
                </SelectTrigger>
                <SelectContent>
                    {bonusProgramsOptions?.map((bonusProgram) => (
                        <SelectItem
                            key={bonusProgram.value}
                            value={bonusProgram.value}
                        >
                            {bonusProgram.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <AddBonusProgramsModal size='icon' />
        </div>
    )
}
