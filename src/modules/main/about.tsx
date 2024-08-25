import { Link } from 'react-router-dom'

import aboutService from '@/assets/images/main/about-service.jpg'
import aboutTeam from '@/assets/images/main/about-team.jpg'
import { routes } from '@/constants/routes'

export const About = () => {
    return (
        <section
            className='mt-8 grid grid-cols-2 gap-8 max-lg:grid-cols-1'
            id='about'
        >
            <div>
                <div>
                    <h2 className='mt-8 text-[32px] text-primary'>Про нас</h2>
                    <p className='mt-3 text-foreground/60'>
                        Ми молода та швидко прогресуюча команда, яка любить те що робить і
                        робить те, що любить ! Працюємо у гуртовому напрямку продажу
                        квітів, лише 3 роки, проте за цей час, розвинули наш сервіс,
                        випереджаючи власний досвід на декілька років вперед.
                    </p>
                    <p className='mt-3 text-foreground/60'>
                        Основинй напрямок нашої діяльності, це гуртовий продаж зрізаних
                        квітів. Ми купуємо їх на найбільшому аукціоні світу -Royal Flora
                        Holland, а також працюємо з виробниками Еквадору, Колумбії, Кенії
                        та інших країн світу, включаючи українськиї фермерів. Окрім
                        зрізаних квітів у нас можна замовити рослини та флористичну
                        фурнітуру.
                    </p>
                    <p className='mt-3 text-foreground/60'>
                        Щодня ми намагаємося ставати кращими та розвиватися ще більше!
                        Раніше ми були відомі під назвою Flowers Opt, провівши ребрендинг
                        та ренеймінг тепер ми - Apex Flora, що в перекладі - вершина
                        флористики. Let's go досягати її разом ?
                    </p>
                </div>

                <div
                    className='mt-8 h-96 w-full rounded-md bg-cover bg-[center_top_1rem] max-sm:h-72'
                    style={{
                        backgroundImage: `url(${aboutTeam})`,
                        backgroundPositionY: '-100px'
                    }}
                ></div>
            </div>
            <div className='max-lg:flex max-lg:flex-col-reverse'>
                <div
                    className='mt-8 h-96 w-full rounded-md bg-cover max-sm:h-72'
                    style={{
                        backgroundImage: `url(${aboutService})`
                    }}
                ></div>
                <div>
                    <h2 className='mt-8 text-[32px] text-primary'>Про наш сервіс</h2>
                    <p className='mt-3 text-foreground/60'>
                        Ми зібрали величезний асортимент квітів від краших виробників з
                        усього світу, в одному місці!
                    </p>
                    <p className='mt-3 text-foreground/60'>
                        Купуючи квіти з вебшопу Apex Flora, ви отримуєте доступ до
                        найбільшого асортименту квітів від садівників з Еквадору,
                        Колумбії, Кенії, Ефіопії, Нідерландів та інших країн світу, а
                        також локальних виробників квітів з України.
                    </p>
                    <p className='mt-3 text-foreground/60'>
                        Купувати квіти з Apex Flora - це зручно, професійно, сучасно, а
                        саме головне, вигідно ! Ми працюємо без посередників, тому можемо
                        сформувати найкращу ціну на ринку. Здійснюємо безкоштовну доставку
                        замволень, до дверей вашик квіткових магазинів.
                    </p>
                    <p className='mt-3 text-foreground/60'>
                        Краще один раз спробувати ніж 100 раз почути!
                    </p>
                    <Link
                        className='text-primary transition-colors hover:text-accent'
                        to={routes.signUp}
                    >
                        Реєструйтесь та отримуйте знижку 10% на перше замволення.
                    </Link>
                </div>
            </div>
        </section>
    )
}
