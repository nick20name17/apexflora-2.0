import { StringParam, useQueryParam } from 'use-query-params'

import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'

interface LetterFilterProps {
    posibleLetters: string[]
}
export const LetterFilter = ({ posibleLetters }: LetterFilterProps) => {
    const [letters, setLetters] = useQueryParam('letters', StringParam)

    const letterOptions = [
        'а',
        'б',
        'в',
        'г',
        'д',
        'е',
        'є',
        'ж',
        'з',
        'і',
        'й',
        'к',
        'л',
        'м',
        'н',
        'о',
        'п',
        'р',
        'с',
        'т',
        'у',
        'ф',
        'х',
        'ц',
        'ч',
        'ш',
        'щ',
        'ю',
        'я'
    ].map((letter) => letter.toUpperCase())

    const handleLettersChange = (value: string[]) => {
        setLetters(value.length > 0 ? value.join(',') : null)
    }

    return (
        <ToggleGroup
            defaultValue={letters ? letters.split(',') : []}
            onValueChange={handleLettersChange}
            type='multiple'
        >
            {letterOptions.map((letter) => (
                <ToggleGroupItem
                    disabled={!posibleLetters.includes(letter)}
                    size='sm'
                    className='bg-primary/5 data-[state=on]:bg-primary data-[state=on]:text-background'
                    value={letter}
                    key={letter}
                >
                    {letter}
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
    )
}
