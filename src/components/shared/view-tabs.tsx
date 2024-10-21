import { LayoutGrid, StretchHorizontal } from 'lucide-react'
import { useEffect } from 'react'
import { StringParam, useQueryParam } from 'use-query-params'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export type View = 'tiles' | 'lines' | (string & {})

export const ViewTabs = () => {
    const [view = 'tiles', setView] = useQueryParam('view', StringParam)

    useEffect(() => {
        setView(view)
    }, [])

    return (
        <Tabs
            defaultValue={view!}
            onValueChange={setView}
        >
            <TabsList className='bg-secondary'>
                <TabsTrigger
                    className='h-full text-primary data-[state=active]:bg-primary data-[state=active]:text-background'
                    value='tiles'
                >
                    <LayoutGrid className='size-4' />
                </TabsTrigger>
                <TabsTrigger
                    className='h-full text-primary data-[state=active]:bg-primary data-[state=active]:text-background'
                    value='lines'
                >
                    <StretchHorizontal className='size-4' />
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}
