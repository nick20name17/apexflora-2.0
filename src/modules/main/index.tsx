import { About } from './about'
import { Advantages } from './advantages'
import { Contacts } from './contacts'
import { Feedback } from './feedback'
import { Flowers } from './flowers'
import { FlowersFurniture } from './flowers-furniture'
import { Hero } from './hero'

export const Main = () => {
    return (
        <>
            <Hero />
            <Flowers />
            <Advantages />
            <FlowersFurniture />
            <About />
            <Feedback />
            <Contacts />
        </>
    )
}
