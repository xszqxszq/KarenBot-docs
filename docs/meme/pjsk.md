---
title: PJSK表情列表
---

这是一个生成PJSK（プロセカ / 初音未来：缤纷舞台）风格表情包的功能。

使用方法：`@可怜BOT /pjsk 人物+编号 文本`

点击下方表情可以快速复制人物+编号：

<div v-for="character in characters" :key="character.name" class="character-block">
    <h2>{{ character.name }}</h2>
    <div class="grid">
        <div
            v-for="sticker in character.stickers"
            :key="sticker"
            class="card"
            @click="copyId(character.name, sticker)"
        >
            <img
                :src="`https://bot-assets.xszq.xyz/meme/pjsk/${sticker}`"
                :alt="sticker"
                no-view
            />
        </div>
    </div>
</div>

<script setup>
    import { ref, onMounted } from 'vue';
    import 'tippy.js/dist/tippy.css';
    import { Notyf } from 'notyf';
    import 'notyf/notyf.min.css';

    const characters = ref([]);
    const notyf = new Notyf();
    const sentinel = ref(null);

    function copyId(character, filename) {
        let id = parseInt(filename.split('_')[1].split('.')[0]);
        let toCopy = character + id;
        navigator.clipboard.writeText(toCopy)
            .then(() => notyf.success(`已复制表情ID：${toCopy}`));
    }

    onMounted(async () => {
        const res = await fetch('/data/meme/pjsk.json');
        characters.value = await res.json();
    });
</script>

<style scoped>
    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
        gap: 12px;
        padding: 16px 0;
    }
    .card {
        position: relative;
        padding-top: 100%;
        cursor: pointer;
    }
    .card img {
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        object-fit: cover;
        transition: filter .5s ease;
    }
    .card:hover img {
        filter: brightness(0.6);
        cursor: pointer;
    }
    .sentinel {
        height: 1px;
    }
</style>