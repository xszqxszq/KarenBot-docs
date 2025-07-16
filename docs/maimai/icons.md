---
title: 头像列表
createTime: 2025/07/16 13:44:02
---

<div class="grid">
    <div
            v-for="item in displayed"
            :key="item.id"
            class="card"
            :data-tippy-content="tooltipContent(item)"
            @click="copyId(item.id)"
    >
        <img
                :src="`https://mai-assets.xszq.xyz/icon/${item.id}.webp`"
                :alt="item.name"
                no-view
        />
    </div>
    <div ref="sentinel" class="sentinel"></div>
</div>

<script setup>
    import { ref, onMounted, nextTick } from 'vue';
    import tippy from 'tippy.js';
    import 'tippy.js/dist/tippy.css';
    import { Notyf } from 'notyf';
    import 'notyf/notyf.min.css';

    const items = ref([]);
    const displayed = ref([]);
    const idx = ref(0);
    const batch = 100;             // 每次加载 100 个
    const notyf = new Notyf();
    const sentinel = ref(null);

    // 生成悬停时的多行内容
    const tooltipContent = item =>
        `<strong>ID:</strong> ${item.id}<br/>
   <strong>名称:</strong> ${item.name}<br/>
   <strong>分类:</strong> ${item.genre}<br/>
   <strong>说明:</strong> ${item.hint}`;

    function copyId(id) {
        navigator.clipboard.writeText(id)
            .then(() => notyf.success(`已复制头像ID：${id}`));
    }

    function loadMore() {
        const slice = items.value.slice(idx.value, idx.value + batch);
        if (slice.length) {
            displayed.value.push(...slice);
            idx.value += batch;
            nextTick(() => {
                tippy('.card', {
                    allowHTML: true,
                    interactive: true,
                    theme: 'light-border',
                    maxWidth: 200
                });
            });
        }
    }

    onMounted(async () => {
        const res = await fetch('/data/icon.json');
        items.value = await res.json();
        loadMore();
        const io = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) loadMore();
        }, { rootMargin: '200px' });
        if (sentinel.value) io.observe(sentinel.value);
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