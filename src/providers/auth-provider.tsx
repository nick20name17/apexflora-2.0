import { type PropsWithChildren } from 'react'

import { PageLoader } from '@/components/ui/page-loader'

// interface UserId {
//     id: number
// }

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    // const userId =
    //     (JSON.parse(localStorage.getItem('id') || 'null') as UserId)?.id ??
    //     (JSON.parse(sessionStorage.getItem('id') || 'null') as UserId)?.id

    // const { isLoading } = useGetUserQuery(userId)

    if (false) {
        return <PageLoader />
    }

    return children
}
