---
title: 更新查分器
---

<Card title="温馨提示" icon="twemoji:check-mark-button">
    本文涉及到的所有代理软件仅用于爬取舞萌成绩信息。在使用下文提及的各种代理软件时，请遵守中华人民共和国相关法律法规，文明上网。
</Card>

可怜BOT现在支持通过代理服务器，爬取微信公众号上的舞萌成绩，并更新至[水鱼查分器](https://www.diving-fish.com/maimaidx/prober/)。

## 1. 绑定 Token
首次使用前，请使用“/绑定水鱼 成绩导入Token”（可在[水鱼查分器](https://www.diving-fish.com/maimaidx/prober/)中点击“编辑个人资料”查看）在可怜BOT中绑定查分器的更新 Token。

## 2. 设置代理
下一步，请根据您使用的代理软件，进行对应设置：

### Clash / ShadowRocket
仅需在软件中添加一个订阅并更新，订阅地址为：`https://bot-api.otmdb.cn/maimai/proxy-config/clash`

### Throne / Nekoray
请先在浏览器中打开以下地址，复制内容后回到代理软件中，点击“配置档”-“手动新建配置档”，类型请选择“自定义（sing-box 配置）”，并粘贴复制的内容。

**请勿添加为订阅链接，否则会导致出现问题。**

## 3. 进行更新
首先向可怜BOT发送“更新”命令，将会向您发送形如https://bot-api.otmdb.cn/maimai/update?token=xxxxxx的一个地址；

接下来请打开您的代理软件，并连接至上一步配置好的代理；

最后，请将上述链接粘贴至微信任意聊天窗口中发送，然后点击打开。当您看到提示“BOT正在更新中，您可以关闭此页面了”后，即可关闭页面，等待更新完成。