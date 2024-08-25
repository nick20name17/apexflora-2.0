import { HeartIcon } from 'lucide-react'

export const Advantages = () => {
    return (
        <section
            className='mt-8'
            id='advantages'
        >
            <h2 className='text-[32px] text-primary'>Наші переваги</h2>
            <p className='mt-1 text-foreground/60'>
                Кращий спосіб оцінити наші переваги, це оформити перше замовлення, нижче
                виділимо, чому це варто зробити вже зараз
            </p>

            <ul className='mt-5 grid gap-5 md:grid-cols-1 lg:grid-cols-2'>
                <li className='flex items-start gap-4 rounded-md bg-secondary/40 px-8 py-12 max-md:px-4 max-md:py-8 max-sm:flex-wrap'>
                    <HeartIcon
                        fill='currentColor'
                        className='size-8 flex-shrink-0 text-primary'
                    />
                    <div>
                        <h3 className='text-xl text-primary'>
                            Більше 1000 позицій квітів
                        </h3>
                        <p className='mt-1 text-foreground/60'>
                            У нашому вебшопі зібрано більше 1000 позицій зрізаних квітів,
                            від провідних світових виробників. Обирай краще для свого
                            бізнесу !
                        </p>
                    </div>
                </li>
                <li className='flex items-start gap-4 rounded-md bg-secondary/40 px-8 py-12 max-md:px-4 max-md:py-8 max-sm:flex-wrap'>
                    <HeartIcon
                        fill='currentColor'
                        className='size-8 flex-shrink-0 text-primary'
                    />
                    <div>
                        <h3 className='text-xl text-primary'>
                            Доставка до дверей магазину
                        </h3>
                        <p className='mt-1 text-foreground/60'>
                            Ми здійснюємо доставку квтів у спеціалізованих рефрижираторах,
                            з дотриманням температурних вимог. Отримайте щотижня тільки
                            свіжі квіти для своїх квіткових вітрин!
                        </p>
                    </div>
                </li>
                <li className='flex items-start gap-4 rounded-md bg-secondary/40 px-8 py-12 max-md:px-4 max-md:py-8 max-sm:flex-wrap'>
                    <HeartIcon
                        fill='currentColor'
                        className='size-8 flex-shrink-0 text-primary'
                    />
                    <div>
                        <h3 className='text-xl text-primary'>Якісний сервіс</h3>
                        <p className='mt-1 text-foreground/60'>
                            Після реєстрації на нашому сайті, ви отримуєте супровід
                            персонального менеджера, який допоможе вам у виборі квітів,
                            під ваші потреби.
                        </p>
                    </div>
                </li>
                <li className='flex items-start gap-4 rounded-md bg-secondary/40 px-8 py-12 max-md:px-4 max-md:py-8 max-sm:flex-wrap'>
                    <HeartIcon
                        fill='currentColor'
                        className='size-8 flex-shrink-0 text-primary'
                    />
                    <div>
                        <h3 className='text-xl text-primary'>Вигідні ціни на квіти</h3>
                        <p className='mt-1 text-foreground/60'>
                            Купуй вигідно напряму у виробників квітів з усього світу.
                            Економте свій час та гроші, купуючи квіти для ваших магазинів,
                            без посередників!
                        </p>
                    </div>
                </li>
            </ul>
        </section>
    )
}
