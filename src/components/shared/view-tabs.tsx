import { LayoutGrid, StretchHorizontal } from 'lucide-react'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export type View = 'tiles' | 'lines' | (string & {})

interface ViewTabsProps {
    view: View
    setView: React.Dispatch<React.SetStateAction<View>>
}

export const ViewTabs = ({ view, setView }: ViewTabsProps) => {
    return (
        <Tabs
            defaultValue={view}
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
