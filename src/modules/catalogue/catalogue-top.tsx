import { AnimatePresence, motion } from 'framer-motion'
import { Loader2, X } from 'lucide-react'
import { StringParam, useQueryParam } from 'use-query-params'

import { OrderingSelect, ViewTabs } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { animations } from '@/config/animations'
import { useGetAllCategoriesQuery } from '@/store/api/categories/categories'
import type { Categories } from '@/store/api/categories/categories.types'
import { useGetAllColorsQuery } from '@/store/api/colors/colors'
import { useGetAllProducersQuery } from '@/store/api/producers/producers'

interface CatalogueTopProps {
    shopProductsCount: number
    isDataRetriving: boolean
}

export const CatalogueTop = ({
    shopProductsCount,
    isDataRetriving
}: CatalogueTopProps) => {
    return (
        <div
            className='flex items-center justify-between gap-x-2'
            id='catalogue-top'
        >
            <div className='flex items-center gap-x-4'>
                <div className='flex items-center gap-x-1 text-primary'>
                    Знайдено товарів:{' '}
                    <div>
                        {isDataRetriving ? (
                            <Loader2 className='size-4 animate-spin' />
                        ) : (
                            shopProductsCount
                        )}
                    </div>
                </div>

                <AppliedFilters />
            </div>
            <div className='flex items-center gap-x-4'>
                <OrderingSelect />
                <ViewTabs />
            </div>
        </div>
    )
}

const AppliedFilters = () => {
    const { data: allColors } = useGetAllColorsQuery()
    const { data: allProducers } = useGetAllProducersQuery()
    const { data: allCategories } = useGetAllCategoriesQuery({
        only_parent: true
    })

    const [promo, setPromo] = useQueryParam('promo', StringParam)
    const [colors, setColors] = useQueryParam('colors', StringParam)
    const [price, setPrice] = useQueryParam('price', StringParam)
    const [height, setHeight] = useQueryParam('height', StringParam)
    const [categories, setCategories] = useQueryParam('categories', StringParam)
    const [countries, setCountries] = useQueryParam('countries', StringParam)

    const selectedColors = colors ? colors.split(',') : []
    const selectedCountries = countries ? countries.split(',') : []
    const selectedCategories = categories ? categories.split(',') : []

    const getColorName = (colorId: string) => {
        const color = allColors?.find((color) => color.id.toString() === colorId)
        return color ? color.name : null
    }

    const getCategoryName = (categoryId: string) => {
        const flattenCategories = (categories: Categories[]): Categories[] => {
            return categories.reduce((acc: Categories[], category: Categories) => {
                const { children, ...rest } = category
                return acc.concat(
                    rest as any,
                    children ? flattenCategories(children) : []
                )
            }, [])
        }

        const allFlattenedCategories = flattenCategories(allCategories || [])

        const category = allFlattenedCategories?.find(
            (category) => category.id.toString() === categoryId
        )

        return category ? category.name : null
    }

    const getCountryNameAndFlag = (countryCode: string) => {
        const producer = allProducers?.find(
            (producer) => producer.country.code === countryCode
        )

        return {
            name: producer?.country.name,
            flag: producer?.country.flag
        }
    }

    const filters = [
        { key: 'promo', label: promo && 'Промо ціна' },
        {
            key: 'price',
            label: price && `Ціна: ${price.split(',')[0]}₴ - ${price.split(',')[1]}₴`
        },
        {
            key: 'height',
            label:
                height && `Висота: ${height.split(',')[0]}см - ${height.split(',')[1]}см`
        }
    ].filter((filter) => filter.label)

    const onFilterRemove = (key: string, value: string | null = null) => {
        const setterMap: Record<string, (value: string | null) => void> = {
            promo: setPromo,
            colors: setColors,
            price: setPrice,
            height: setHeight,
            categories: setCategories,
            countries: setCountries
        }

        if (value) {
            const currentValue = setterMap[key](null)
            const newValues = currentValue?.split(',').filter((v) => v !== value) || []
            setterMap[key](newValues.length > 0 ? newValues.join(',') : null)
        } else {
            setterMap[key](null)
        }
    }

    const onClearAll = () => {
        setPromo(null)
        setColors(null)
        setPrice(null)
        setHeight(null)
        setCategories(null)
        setCountries(null)
    }

    return (
        <ul className='flex flex-wrap items-center gap-2'>
            <AnimatePresence
                initial={false}
                mode='popLayout'
            >
                {filters.map((filter) => (
                    <motion.li
                        {...animations.popLayout}
                        key={filter.key}
                    >
                        <Button
                            onClick={() => onFilterRemove(filter.key)}
                            className='h-4 rounded-full bg-secondary px-4 py-3 text-xs text-primary transition-colors hover:text-background'
                        >
                            {filter.label}
                            <X className='ml-2 size-4' />
                        </Button>
                    </motion.li>
                ))}

                {selectedColors.map((colorId) => (
                    <motion.li
                        {...animations.popLayout}
                        key={`color-${colorId}`}
                    >
                        <Button
                            onClick={() => onFilterRemove('colors', colorId)}
                            className='h-4 rounded-full bg-secondary px-4 py-3 text-xs text-primary transition-colors hover:text-background'
                        >
                            {getColorName(colorId)}
                            <X className='ml-2 size-4' />
                        </Button>
                    </motion.li>
                ))}

                {selectedCountries.map((country) => {
                    const { flag, name } = getCountryNameAndFlag(country)

                    return (
                        <motion.li
                            {...animations.popLayout}
                            key={`country-${country}`}
                        >
                            <Button
                                onClick={() => onFilterRemove('countries', country)}
                                className='h-4 rounded-full bg-secondary px-4 py-3 text-xs text-primary transition-colors hover:text-background'
                            >
                                <img
                                    src={flag}
                                    alt='flag'
                                    className='mr-1 size-3'
                                />
                                {name}
                                <X className='ml-2 size-4' />
                            </Button>
                        </motion.li>
                    )
                })}

                {selectedCategories.map((category) => (
                    <motion.li
                        {...animations.popLayout}
                        key={`category-${category}`}
                    >
                        <Button
                            onClick={() => onFilterRemove('categories', category)}
                            className='h-4 rounded-full bg-secondary px-4 py-3 text-xs text-primary transition-colors hover:text-background'
                        >
                            {getCategoryName(category)}
                            <X className='ml-2 size-4' />
                        </Button>
                    </motion.li>
                ))}

                {filters.length ||
                selectedColors.length ||
                selectedCountries.length ||
                selectedCategories.length ? (
                    <motion.li {...animations.popLayout}>
                        <Button
                            onClick={onClearAll}
                            className='h-4 rounded-full bg-destructive/15 px-4 py-3 text-xs text-destructive transition-colors hover:bg-destructive hover:text-background'
                        >
                            Скинути все
                            <X className='ml-2 size-4' />
                        </Button>
                    </motion.li>
                ) : null}
            </AnimatePresence>
        </ul>
    )
}
