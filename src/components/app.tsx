import { Button } from '@/components/ui/button'

export function App() {
    return (
        <>
            <h1 className='text-3xl font-bold'>Apex Flora</h1>
            <Button variant='secondary'>Some button</Button>
            <Button>Some button</Button>

            <Button variant='outline'>Some button</Button>

            <Button variant='accent'>Some button</Button>
        </>
    )
}
