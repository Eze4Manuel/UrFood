import conf from '../../assets/utils/config';

const config = {
    sidebar: [
        {
            divider: 'dashboard',
            sub: [
                {name: 'Analytics', icon: 'las la-tachometer-alt', link: conf.pages.dashboard},
            ]
        },
        {
            divider: 'users',
            sub: [
                {name: 'support', icon: 'las la-user-lock', link: conf.pages.support},
                {name: 'vendors', icon: 'las la-user-friends', link: conf.pages.vendor},
                {name: 'dispatchers', icon: 'las la-truck-moving', link: conf.pages.dispatch},
            ]
        },
        {
            divider: 'services',
            sub: [
                {name: 'transactions', icon: 'las la-store-alt', link: conf.pages.transaction},
                {name: 'dispatch', icon: 'las la-store-alt', link: conf.pages.order},
                {name: 'food', icon: 'las la-utensils', link: conf.pages.food},
            ]
        },
        {
            divider: 'others',
            sub: [
                {name: 'reset password', icon: 'las la-key', link: conf.pages.settings},
                {name: 'logout', icon: 'las la-sign-out-alt', link: conf.pages.login},
            ]
        }
    ],
    navbar: [

    ]
}

export default config;