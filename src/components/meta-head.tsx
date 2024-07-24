import Helmet from 'react-helmet'

import { appDescription } from '@/constants/app'
import { usePageName } from '@/hooks'

export const MetaHead = () => {
    const pageName = usePageName()

    return (
        <Helmet>
            <meta charSet='utf-8' />
            <title>{pageName}</title>
            <meta
                name='description'
                content={appDescription}
            />
            <meta
                name='viewport'
                content='width=device-width, initial-scale=1.0'
            />
        </Helmet>
    )
}
