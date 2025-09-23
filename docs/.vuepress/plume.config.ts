import { defineNoteConfig, defineThemeConfig } from 'vuepress-theme-plume'

const maimai = defineNoteConfig({
    dir: 'maimai',
    link: '/maimai/',
    sidebar: [
        {
            text: '功能说明',
            collapsed: false,
            items: [
                '',
                'combo',
            ]
        },
        {
            text: '资源列表',
            collapsed: false,
            items: [
                'icons',
                'plates'
            ]
        }
    ]
})
const meme = defineNoteConfig({
    dir: 'meme',
    link: '/meme/',
    sidebar: [
        {
            text: '表情包',
            collapsed: false,
            items: [
                '',
                'pjsk'
            ]
        }
    ]
})

export default defineThemeConfig({
    logo: '/logo.png',
    notes: {
        link: '/',
        dir: '/',
        notes: [maimai, meme]
    },
    navbar: [
        { text: '首页', link: '/' },
        { text: '开始', link: '/get-started' },
        { text: '功能', link: '/features' },
        {
            text: '舞萌DX',
            activeMatch: '^/maimai/',
            items: [
                { text: '随心配', link: '/maimai/combo' },
                { text: '头像列表', link: '/maimai/icons' },
                { text: '牌子列表', link: '/maimai/plates' }
            ]
        },
        {
            text: '表情包',
            activeMatch: '^/meme/',
            items: [
                { text: '表情列表', link: '/meme/' },
                { text: 'PJSK', link: '/meme/pjsk' },
            ]
        },
    ],
    footer: {
        message: '<a href="https://beian.miit.gov.cn/">湘ICP备2023033217号</a>',
        copyright: 'Copyright © 2025 xszqxszq'
    }
})