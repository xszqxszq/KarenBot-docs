import { defineNoteConfig, defineThemeConfig } from 'vuepress-theme-plume'

const maimai = defineNoteConfig({
    dir: 'maimai',
    link: '/maimai/',
    sidebar: [
        {
            text: '舞萌DX',
            collapsed: false,
            items: [
                'icons',
                'plates'
            ]
        }
    ]
})

export default defineThemeConfig({
    notes: {
        link: '/',
        dir: '/',
        notes: [maimai]
    },
    navbar: [
        { text: '首页', link: '/' },
        { text: '开始', link: '/get-started' },
        {
            text: '舞萌DX',
            activeMatch: '^/maimai/',
            items: [
                { text: '头像列表', link: '/maimai/icons' },
                { text: '牌子列表', link: '/maimai/plates' }
            ]
        },
    ],
    footer: {
        message: "Created by xszqxszq"
    }
})