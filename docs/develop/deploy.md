---
title: 部署指南
---

本页介绍如何自行部署可怜BOT，以便进行使用及开发。

### 0. 环境要求

| 项目     | 要求                      |
|--------|-------------------------|
| 操作系统   | Linux / Windows / macOS |
| 内存     | 2GB 及以上                 |
| JDK    | JDK 22 及以上              |
| FFmpeg | 需要安装                    |

### 1. QQ 开放平台注册机器人

请前往 [QQ 开放平台](https://q.qq.com/#/) 注册 QQ 机器人，并妥善保管 `AppID`、`AppSecret` 等凭证，将在后续配置时填写。

### 2. 获取代码并构建项目

拉取项目代码及资源：

```bash
git clone https://github.com/xszqxszq/KarenBot.git
git clone https://github.com/xszqxszq/KarenBot-Resources.git
```

构建项目：

```bash
cd KarenBot
./gradlew allPlugins
```

构建完成后，Bot 本体在 `build/libs/KarenBot-<版本>.jar`，插件在 `plugins/` 下。

把两者复制到运行目录：

```bash
cp build/libs/KarenBot-*.jar ../KarenBot-Resources/
mkdir -p ../KarenBot-Resources/plugins
cp plugins/*.jar ../KarenBot-Resources/plugins/
```

### 3. 额外资源

以下资源不在 [KarenBot-Resources](https://github.com/xszqxszq/KarenBot-Resources) 中，可根据需要自行下载配置：

#### maimai / chunithm 游戏资源

请从 [Releases](https://github.com/xszqxszq/KarenBot-Resources/releases/latest) 下载最新的 `rhythm-game-assets-<日期>.zip`，并解压到 `data/` 目录：

```bash
unzip -o rhythm-game-assets-<日期>.zip -d data
```

#### 字体

请手动安装以下字体到系统，以便项目在生成图片时能使用正常的字体。Linux 需安装至 `/usr/share/fonts` 路径。

| 字体系列     | 字体名                                            | 官网                                                                              |
|----------|------------------------------------------------|---------------------------------------------------------------------------------|
| 思源黑体     | `Source Han Sans CN Bold`                      | [adobe-fonts/source-han-sans](https://github.com/adobe-fonts/source-han-sans)   |
| 思源宋体     | `Source Han Serif SC`                          | [adobe-fonts/source-han-serif](https://github.com/adobe-fonts/source-han-serif) |
| 未来荧黑     | `Glow Sans SC Normal Heavy`                    | [welai/glow-sans](https://github.com/welai/glow-sans)                           |
| 阿里巴巴普惠体  | `阿里巴巴普惠体-B`、`阿里巴巴普惠体-H`                        | [阿里巴巴普惠体](https://fonts.alibabagroup.com/)                                      |
| 方正兰亭黑    | `方正兰亭粗黑_GBK`、`方正兰亭特黑_GBK`、`FZLanTingHei-B-GBK` | [方正字体](https://www.foundertype.com/)                                            |
| 上首方糖体    | `SSFangTangTi`                                 | [上首方糖体](http://www.ssfonts.com/shows/9/43.html)                                 |
| FOT-ユールカ | `FOT-Yuruka Std UB`                            | [FOT-ユールカ Std](https://lets.fontworks.co.jp/fonts/218)                          |
| G2サンセリフ  | `Ro GSan Serif Std B`                          | [TypeBank](https://www.morisawa.co.jp/fonts/specimen/detail/841)                |

#### 其他可选资源

| 资源                     | 路径                                              | 说明                                                                                                                                            |
|------------------------|-------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| Emoji Kitchen          | `data/meme/emoji/`                              | Emoji 混合功能，来自 [Emoji Kitchen](https://emojikitchen.dev)，可以使用 `tools/emoji-kitchen.py` 拉取                                                      |
| maimai / chunithm 歌曲预览 | `data/maimai/preview/`、`data/chunithm/preview/` | 请参考[落雪查分器文档](https://maimai.lxns.net/docs)自行拉取并处理，转为ogg格式                                                                                     |
| 东方Project原曲音频          | `data/audio/touhou/`                            | 东方原曲认知测验/随机东方原曲功能使用，请自行从 [THBWiki](https://thbwiki.cc/%E5%8E%9F%E6%9B%B2%E5%88%97%E8%A1%A8) 拉取，转为 ogg 格式存放到`<作品编号>/<ID>.ogg`（如 `th13/15.ogg`） |


### 4. 配置

请参考 `test/config/` 中的模板配置：

```bash
cp -r test/config config
```

| 文件              | 是否必须 | 说明                                                                                                  |
|-----------------|------|-----------------------------------------------------------------------------------------------------|
| `bot.yml`       | 是    | QQ 机器人 `appId` / `clientSecret`，监听端口 `port`，以及数据库配置 `database`                                      |
| `cos.yml`       | 是    | 腾讯云对象存储，用于上传图片                                                                                      |
| `maimai.yml`    | 是    | `tokens.assets-jacket`，以及 diving-fish 和落雪查分器的开发者 Token 和 OAuth 信息                                   |
| `chunithm.yml`  | 是    | 同上                                                                                                  |
| `llm.yml`       | 否    | 用于别名审核及封面描述等场景的 LLM 配置                                                                              |
| `meme.yml`      | 是    | 需要先部署 [MemeCrafters/meme-generator-rs](https://github.com/MemeCrafters/meme-generator-rs)，此处填写该服务地址 |
| `text.yml`      | 否    | 文本回复预设和 LLM 的 Prompt                                                                                |
| `admin.yml`     | 否    | 管理员的 ID 列表                                                                                          |
| `sensitive.txt` | 否    | 消息直接过滤的敏感词，一行一个                                                                                     |

### 5. 启动

如果您使用 [sdkman](https://sdkman.io) 管理 JDK，且安装了 jemalloc，则可以直接用 `start.sh` 启动。也可以使用以下命令：

```bash
java -Djava.util.logging.config.file=logging.properties \
	-Dlog4j.logger.marytts=WARN \
	--enable-native-access=ALL-UNNAMED \
	--sun-misc-unsafe-memory-access=allow \
	-Xms512m -Xmx1536m -XX:MaxHeapFreeRatio=40 \
	-jar KarenBot-<版本号>.jar
```

### 6. 配置 HTTPS 并连接 QQ 开放平台

由于本项目仅支持 [Webhook](https://bot.q.qq.com/wiki/develop/api-v2/dev-prepare/event-emit/webhook.html) 连接腾讯服务器，因此您需要将机器人暴露给公网。

如果您使用的是公网 VPS，则还需要配置 nginx / apache 等，配置好 HTTPS 证书等信息，并使其 proxy_pass 到机器人服务使用的 18080 端口。

如果您没有公网 IP，则可以使用 FRP 服务来进行内网穿透，一般此类穿透服务会自带 HTTPS 证书，如可免费使用的 [SakuraFrp](https://doc.natfrp.com/app/http.html)，能提供免费穿透域名及证书。配置时请注意，本项目 18080 端口提供的是 **HTTP** 而非 **HTTPS**，而隧道类型请选择 **HTTPS**。

在 QQ 开放平台上，对于事件订阅地址，请填写 `https://<域名>:<port>/webhook`，貌似腾讯只支持 `443`、`8443` 等少数常见端口。

### 版权

本项目资源的使用范围与来源见[版权声明](https://github.com/xszqxszq/KarenBot-Resources#版权声明)。
