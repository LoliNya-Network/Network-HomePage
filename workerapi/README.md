# HE.NET BGP API

这是一个部署在 Cloudflare Workers 上的 API 服务，提供 HE.NET BGP 和 WHOIS 数据查询功能。

## 功能特性

- 🔍 查询指定 ASN 的 BGP 前缀
- 🌐 批量查询前缀的 WHOIS 信息
- 📊 获取 ASN 的所有前缀及其 WHOIS 信息
- ⚡ 基于 Cloudflare Workers 的快速响应
- 🔒 内置 CORS 支持
- 📝 完整的错误处理

## API 端点

### 1. 健康检查
```
GET /api/health
```

### 2. 获取 ASN 的 BGP 前缀
```
GET /api/bgp/{asn}
```

示例：
```bash
curl https://your-worker.workers.dev/api/bgp/13335
```

### 3. 批量查询前缀 WHOIS 信息
```
POST /api/whois
Content-Type: application/json

{
  "prefixes": ["1.1.1.0/24", "8.8.8.0/24"]
}
```

示例：
```bash
curl -X POST https://your-worker.workers.dev/api/whois \
  -H "Content-Type: application/json" \
  -d '{"prefixes": ["1.1.1.0/24"]}'
```

### 4. 获取 ASN 的所有前缀及 WHOIS 信息
```
GET /api/as/{asn}/whois
```

示例：
```bash
curl https://your-worker.workers.dev/api/as/13335/whois
```

### 5. API 文档
```
GET /
GET /api
```

## 响应格式

所有 API 响应都使用统一的格式：

```json
{
  "success": true,
  "data": {},
  "message": "Optional success message"
}
```

错误响应：
```json
{
  "success": false,
  "error": "Error message"
}
```

## 部署

### 先决条件

1. 安装 Node.js (版本 18 或更高)
2. 安装 Wrangler CLI
3. 拥有 Cloudflare 账户

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

### 部署到 Cloudflare Workers

1. 登录 Cloudflare：
```bash
npx wrangler login
```

2. 部署到生产环境：
```bash
npm run deploy:production
```

3. 部署到测试环境：
```bash
npm run deploy:staging
```

## 限制

- WHOIS 查询每次请求最多支持 100 个前缀
- 依赖 HE.NET 的 API 可用性
- Cloudflare Workers 的执行时间限制（免费版本 10 秒，付费版本 30 秒）

## 错误处理

API 包含完整的错误处理机制：

- 输入验证
- ASN 格式验证
- HTTP 状态码检查
- 网络请求超时处理
- 详细的错误消息

## 示例用法

```javascript
// 获取 Cloudflare (AS13335) 的 BGP 前缀
const response = await fetch('https://your-worker.workers.dev/api/bgp/13335')
const data = await response.json()

if (data.success) {
  console.log('BGP Prefixes:', data.data.prefixes)
}

// 获取带 WHOIS 信息的完整数据
const whoisResponse = await fetch('https://your-worker.workers.dev/api/as/13335/whois')
const whoisData = await whoisResponse.json()

if (whoisData.success) {
  console.log('Prefixes with WHOIS:', whoisData.data)
}
```

## 许可证

MIT License
