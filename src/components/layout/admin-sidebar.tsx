import {
    Infinity,
    ChartBarStacked,
    ChevronsUpDown,
    Contact,
    Flower,
    Flower2,
    LogOut,
    Palette,
    Percent,
    TicketPercent,
    UserMinus,
    UserPlus,
    Users
} from 'lucide-react'
import { Link } from 'react-router-dom'

import { Logo } from '../logo'
import { Avatar, AvatarFallback } from '../ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '../ui/dropdown-menu'
import {
    SidebarFooter,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from '../ui/sidebar'

import { Sidebar, SidebarContent, SidebarGroup } from '@/components/ui/sidebar'
import { adminRoutes } from '@/constants/routes'
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks'
import { logout, selectUser } from '@/store/slices/auth'

export const AdminSidebar = () => {
    const user = useAppSelector(selectUser)

    const dispatch = useAppDispatch()

    const upperCaseInitials =
        user?.first_name?.charAt(0)?.toUpperCase() ||
        '' + user?.last_name?.charAt(0)?.toUpperCase() ||
        ''

    return (
        <Sidebar collapsible='icon'>
            <SidebarHeader className='bg-primary'>
                <SidebarMenu>
                    <SidebarMenuItem className='pt-1'>
                        <Logo className='max-w-14' />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className='bg-primary text-background'>
                <SidebarGroup>
                    <SidebarGroupLabel className='text-background/40'>
                        Бонусні програми
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to={adminRoutes.bonuseLimits}>
                                        <Infinity />
                                        <span>Бонусні ліміти</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to={adminRoutes.bonusePrograms}>
                                        <Percent />
                                        <span>Бонусні програми</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel className='text-background/40'>
                        Користувачі
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to={adminRoutes.archive}>
                                        <UserMinus />
                                        <span>Архів</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to={adminRoutes.contacts}>
                                        <Contact />
                                        <span>Зворотній звязок</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to={adminRoutes.registrationRequests}>
                                        <UserPlus />
                                        <span>Запити на реєстрацію</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to={adminRoutes.users}>
                                        <Users />
                                        <span>Список користувачів</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel className='text-background/40'>
                        Товари
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to={adminRoutes.products}>
                                        <Flower />
                                        <span>Товари</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to={adminRoutes.categories}>
                                        <ChartBarStacked />
                                        <span>Категорії</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to={adminRoutes.colors}>
                                        <Palette />
                                        <span>Кольори</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to={adminRoutes.producers}>
                                        <UserPlus />
                                        <span>Виробники</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to={adminRoutes.discounts}>
                                        <TicketPercent />
                                        <span>Знижки</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel className='text-background/40'>
                        Замовлення
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to={adminRoutes.orders}>
                                        <Flower2 />
                                        <span>Замовлення</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className='bg-primary text-background'>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size='lg'
                                    className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                                >
                                    <Avatar className='h-8 w-8 rounded-lg'>
                                        <AvatarFallback className='rounded-lg bg-accent text-foreground'>
                                            {upperCaseInitials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className='grid flex-1 text-left text-sm leading-tight'>
                                        <span className='truncate font-semibold'>
                                            {user?.first_name + ' ' + user?.last_name}
                                        </span>
                                        <span className='truncate text-xs'>
                                            {user?.email}
                                        </span>
                                    </div>
                                    <ChevronsUpDown className='ml-auto size-4' />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
                                side='bottom'
                                align='end'
                                sideOffset={4}
                            >
                                <DropdownMenuLabel className='p-0 font-normal'>
                                    <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                                        <Avatar className='h-8 w-8 rounded-lg'>
                                            <AvatarFallback className='rounded-lg bg-accent text-foreground'>
                                                {upperCaseInitials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className='grid flex-1 text-left text-sm leading-tight'>
                                            <span className='truncate font-semibold'>
                                                {user?.first_name + ' ' + user?.last_name}
                                            </span>
                                            <span className='truncate text-xs'>
                                                {user?.email}
                                            </span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                <DropdownMenuItem onClick={() => dispatch(logout())}>
                                    <LogOut className='mr-2 size-4' />
                                    Вийти з аккаунту
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}