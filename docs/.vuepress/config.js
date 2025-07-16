import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { plumeTheme } from 'vuepress-theme-plume'

export default defineUserConfig({
  lang: 'zh-CN',

  title: '可怜BOT',
  description: '可怜BOT使用帮助',

  theme: plumeTheme({
    logo: 'https://vuejs.press/images/hero.png',

    themePlugins: {
      mediumZoom: false,
    },
    autoFrontmatter: {
      permalink: false,
      createTime: false,
      title: false,
    },
    lastUpdated: true
  }),

  bundler: viteBundler(),
})
