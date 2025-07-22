---
title: 表情列表
---

<Card title="温馨提示" icon="twemoji:check-mark-button">
    使用本功能时请遵守中华人民共和国相关法律法规，文明上网。
</Card>

## 功能介绍

可怜BOT支持通过“/生成”命令生成表情包。

使用方法：`@可怜BOT /生成 表情包名称/关键词 参数 ...`

## 表情列表

**点击下方表情**即可复制生成表情的**示例命令**，**悬停**可以查看详细信息。如不清楚如何使用请查看[这里](https://github.com/MemeCrafters/meme-generator-rs/wiki/%E8%A1%A8%E6%83%85%E5%88%97%E8%A1%A8)

### 文本表情

<div class="masonry">
    <div
        v-for="meme in texts"
        :key="meme.key"
        class="card"
        :data-tippy-content="tooltipContent(meme)"
        @click="copyId(meme)"
    >
        <img
            :src="`https://bot-assets-fast.xszq.xyz/meme/memes/${meme.preview}`"
            :alt="meme.name"
            no-view
        />
    </div>
</div>

### 图片表情

<div class="masonry">
    <div
        v-for="meme in images"
        :key="meme.key"
        class="card"
        :data-tippy-content="tooltipContent(meme)"
        @click="copyId(meme)"
    >
        <img
            :src="`https://bot-assets-fast.xszq.xyz/meme/memes/${meme.preview}`"
            :alt="meme.name"
            no-view
        />
    </div>
</div>

## 说明

本功能大部分表情使用 [MemeCrafters/meme-generator-rs](https://github.com/MemeCrafters/meme-generator-rs) 生成。

其他表情参考以下项目进行 Kotlin 实现：

- 5000兆円风格参考 [yurafuca/5000choyen](https://github.com/yurafuca/5000choyen)
- 蔚蓝档案LOGO风格参考 [nulla2011/bluearchive-logo](https://github.com/nulla2011/bluearchive-logo)
- PJSK表情参考 [TheOriginalAyaka](https://github.com/TheOriginalAyaka/sekai-stickers)

感谢各开源项目作者及贡献者的辛勤付出。

<script setup>
    import { ref, onMounted, nextTick } from 'vue';
    import tippy from 'tippy.js';
    import 'tippy.js/dist/tippy.css';
    import { Notyf } from 'notyf';
    import 'notyf/notyf.min.css';

    const memes = ref([]);
    const images = ref([]);
    const texts = ref([]);
    const notify = new Notyf();

    const tooltipContent = meme => {
        let content = `
            <strong>名称:</strong> ${meme.name}<br/>
            <strong>示例:</strong> @可怜BOT ${meme.example}<br/>`;

        if (Array.isArray(meme.options) && meme.options.length > 0) {
            content += `<strong>选项：</strong><br/>`;
            meme.options.forEach(opt => {
                content += `&nbsp;&nbsp;${opt}<br/>`;
            });
        }

        return content;
    };

    function copyId(meme) {
        let toCopy = meme.example;
        navigator.clipboard.writeText(toCopy)
            .then(() => notify.success(`已复制表情使用例：${toCopy}`));
    }

    onMounted(async () => {
        const res = await fetch('/data/meme/memes.json');
        memes.value = await res.json();
        texts.value = memes.value.filter(item => item.max_images === 0);
        images.value = memes.value.filter(item => item.min_images !== 0);
        await nextTick();
        tippy('.card', {
            allowHTML: true,
            interactive: true,
            theme: 'light-border',
            maxWidth: 400
        });
    });
</script>

<style scoped>
    .masonry {
        column-count: 1;
        column-gap: 12px;
        padding: 16px 0;
    }

    @media (min-width: 480px) {
        .masonry {
            column-count: 2;
        }
    }

    @media (min-width: 1024px) {
        .masonry {
            column-count: 3;
        }
    }

    .card {
        display: inline-block;
        width: 100%;
        margin: 0 0 12px;
        cursor: pointer;
    }

    .card img {
        width: 100%;
        height: auto;
        object-fit: cover;
        transition: filter .5s ease;
        cursor: pointer;
    }

    .card:hover img {
        filter: brightness(0.6);
    }
</style>