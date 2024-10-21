import { BooleanParam, StringParam, useQueryParam } from 'use-query-params'

import { setCategories } from '../store/catalogue'

import { DualSliderWithInputs } from './dual-slider-with-inputs'
import fireIcon from '@/assets/icons/fire.png'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useGetAllCategoriesQuery } from '@/store/api/categories/categories'
import type { Categories } from '@/store/api/categories/categories.types'
import { useGetAllColorsQuery } from '@/store/api/colors/colors'
import type { ColorsData } from '@/store/api/colors/colors.types'
import { useGetAllProducersQuery } from '@/store/api/producers/producers'
import type { Country } from '@/store/api/producers/producers.types'
import { useAppDispatch } from '@/store/hooks/hooks'

export const FiltersSidebar = () => {
    const { data: colors } = useGetAllColorsQuery()
    const { data: producers } = useGetAllProducersQuery()
    const { data: categories } = useGetAllCategoriesQuery({
        only_parent: true
    })

    const producersData = producers || []

    const uniqueCountries = producersData
        .map((item) => item.country)
        .filter(
            (country, index, self) =>
                index === self.findIndex((c) => c.code === country.code)
        )

    return (
        <ScrollArea className='h-[calc(100vh-125px)] w-64 bg-secondary px-6 pb-6 pt-2 max-[1128px]:hidden'>
            <Accordion type='multiple'>
                <AccordionItem value='category'>
                    <AccordionTrigger className='px-1 py-3 text-primary'>
                        Категорія
                    </AccordionTrigger>
                    <AccordionContent className='space-y-2 px-1 pb-3'>
                        <CategoriesFilter categories={categories || []} />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value='country'>
                    <AccordionTrigger className='px-1 py-3 text-primary'>
                        Країна
                    </AccordionTrigger>
                    <AccordionContent className='space-y-3 px-1 pb-3'>
                        <CountriesFilter countries={uniqueCountries} />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value='color'>
                    <AccordionTrigger className='px-1 py-3 text-primary'>
                        Колір
                    </AccordionTrigger>
                    <AccordionContent className='space-y-3 px-1 pb-3'>
                        <ColorsFilter colors={colors || []} />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value='price'>
                    <AccordionTrigger className='px-1 py-3 text-primary'>
                        Ціна за штуку, ₴
                    </AccordionTrigger>
                    <AccordionContent>
                        <PriceFilter />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value='height'>
                    <AccordionTrigger className='px-1 py-3 text-primary'>
                        Висота, см.
                    </AccordionTrigger>
                    <AccordionContent>
                        <HeightFilter />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <PromoFilter />
        </ScrollArea>
    )
}

const CategoriesFilter = ({ categories }: { categories: Categories[] }) => {
    const [categoriesParam, setCategoriesParam] = useQueryParam('categories', StringParam)

    const dispatch = useAppDispatch()

    const selectedCategories = categoriesParam ? categoriesParam.split(',') : []

    const onCategoryChange = (categoryId: string, categoryName: string) => {
        let updatedCategories = [...selectedCategories]

        if (updatedCategories.includes(categoryId)) {
            updatedCategories = updatedCategories.filter((id) => id !== categoryId)
        } else {
            updatedCategories.push(categoryId)
        }

        setCategoriesParam(
            updatedCategories.length > 0 ? updatedCategories.join(',') : null
        )

        dispatch(
            setCategories(updatedCategories.map((id) => ({ id, label: categoryName })))
        )
    }

    const renderCategories = (categories: Categories[]) =>
        categories.map((category) =>
            category.children && category.children.length > 0 ? (
                <AccordionItem
                    className='border-none'
                    key={category.id}
                    value={category.id.toString()}
                >
                    <AccordionTrigger className='py-1.5'>
                        <div className='flex items-center gap-x-2'>
                            <Checkbox
                                onClick={(e) => {
                                    e.stopPropagation()
                                }}
                                id={category.id.toString()}
                                checked={selectedCategories.includes(
                                    category.id.toString()
                                )}
                                onCheckedChange={() =>
                                    onCategoryChange(
                                        category.id.toString(),
                                        category.name
                                    )
                                }
                            />
                            <label
                                onClick={(e) => {
                                    e.stopPropagation()
                                }}
                                htmlFor={category.id.toString()}
                                className='text-sm font-medium leading-none'
                            >
                                {category.name}
                            </label>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className='pl-3'>{renderCategories(category.children)}</div>
                    </AccordionContent>
                </AccordionItem>
            ) : (
                <div
                    key={category.id}
                    className='mt-2.5 flex items-center gap-x-3'
                >
                    <Checkbox
                        id={category.id.toString()}
                        checked={selectedCategories.includes(category.id.toString())}
                        onCheckedChange={() =>
                            onCategoryChange(category.id.toString(), category.name)
                        }
                    />
                    <label
                        htmlFor={category.id.toString()}
                        className='text-sm font-medium leading-none'
                    >
                        {category.name}
                    </label>
                </div>
            )
        )

    return <Accordion type='multiple'>{renderCategories(categories)}</Accordion>
}

const CountriesFilter = ({ countries }: { countries: Country[] }) => {
    const [countriesParam, setCountriesParam] = useQueryParam('countries', StringParam)

    const selectedCountries = countriesParam ? countriesParam.split(',') : []

    const onCountryChange = (country: string) => {
        let updatedCountries = [...selectedCountries]

        if (updatedCountries.includes(country.toString())) {
            updatedCountries = updatedCountries.filter((c) => c !== country.toString())
        } else {
            updatedCountries.push(country.toString())
        }

        setCountriesParam(updatedCountries.length > 0 ? updatedCountries.join(',') : null)
    }

    return (
        <>
            {countries?.map((country) => (
                <div
                    key={country.code}
                    className='flex items-center gap-x-3'
                >
                    <Checkbox
                        id={country.code}
                        checked={selectedCountries.includes(country.code)}
                        onCheckedChange={() => onCountryChange(country.code)}
                    />
                    <label
                        htmlFor={country.code}
                        className='flex items-center gap-x-1.5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                    >
                        {country.name}
                    </label>
                </div>
            ))}
        </>
    )
}

const ColorsFilter = ({ colors }: { colors: ColorsData[] }) => {
    const [colorsParam, setColorsParam] = useQueryParam('colors', StringParam)

    const selectedColors = colorsParam ? colorsParam.split(',') : []

    const onColorChange = (color: number) => {
        let updatedColors = [...selectedColors]

        if (updatedColors.includes(color.toString())) {
            updatedColors = updatedColors.filter((c) => c !== color.toString())
        } else {
            updatedColors.push(color.toString())
        }

        setColorsParam(updatedColors.length > 0 ? updatedColors.join(',') : null)
    }

    return (
        <>
            {colors?.map((color) => (
                <div
                    key={color.id}
                    className='flex items-center gap-x-3'
                >
                    <Checkbox
                        id={color.id.toString()}
                        checked={selectedColors.includes(color.id.toString())}
                        onCheckedChange={() => onColorChange(color.id)}
                    />
                    <label
                        htmlFor={color.id.toString()}
                        className='flex items-center gap-x-1.5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                    >
                        <div
                            className='size-4 rounded-full'
                            style={{ backgroundColor: color.hex }}
                        ></div>
                        {color.name}
                    </label>
                </div>
            ))}
        </>
    )
}

const PriceFilter = () => {
    const [priceParam, setPriceParam] = useQueryParam('price', StringParam)

    const onPriceChange = (price: number[]) => {
        setPriceParam(`${price[0]},${price[1]}`)
    }

    return (
        <DualSliderWithInputs
            className='mt-2'
            minStepsBetweenThumbs={1}
            step={5}
            max={100}
            min={5}
            value={priceParam?.split(',').map((value) => +value) || [5, 100]}
            setValue={onPriceChange}
        />
    )
}

const HeightFilter = () => {
    const [heightParam, setHeightParam] = useQueryParam('height', StringParam)

    const onHeightChange = (height: number[]) => {
        setHeightParam(`${height[0]},${height[1]}`)
    }

    return (
        <DualSliderWithInputs
            className='mt-2'
            minStepsBetweenThumbs={1}
            step={5}
            max={100}
            min={5}
            value={heightParam?.split(',').map((value) => +value) || [5, 100]}
            setValue={onHeightChange}
        />
    )
}

const PromoFilter = () => {
    const [promo = false, setPromo] = useQueryParam('promo', BooleanParam)

    const onPromoChange = (promo: boolean) => {
        setPromo(promo === true ? true : null)
    }

    return (
        <div className='mt-4 flex items-center gap-x-3'>
            <Checkbox
                id='promo'
                checked={promo!}
                onCheckedChange={onPromoChange}
            />
            <label
                htmlFor='promo'
                className='flex items-center gap-x-1.5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
                Промо ціна
                <img
                    className='w-3'
                    src={fireIcon}
                    alt='fire'
                />
            </label>
        </div>
    )
}
