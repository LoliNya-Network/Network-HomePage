# 动态节点数据加载功能

## 概述
现在网站支持从动态URL加载网络节点数据，而不是硬编码在组件中。这使得网络拓扑可以实时更新，无需重新部署代码。

## 功能特性

### 1. 动态数据加载
- 支持从本地文件或远程API加载节点数据
- 自动错误处理和回退机制
- 加载状态指示器

### 2. 统一数据管理
- 使用单例模式的NodeService管理所有节点数据
- NetworkMap和Peering组件共享相同的数据源
- 避免重复API调用

### 3. 灵活配置
- 通过环境变量配置API端点
- 支持不同环境的不同数据源
- 组件级别的API URL覆盖支持

## 配置方法

### 环境变量配置
在 `.env` 文件中设置：
```env
# 使用本地文件（默认）
VITE_NODE_API_URL=/assets/nodelist.json

# 使用远程API
VITE_NODE_API_URL=https://api.lolinya.net/v1/nodes

# 使用其他本地文件
VITE_NODE_API_URL=/data/network-nodes.json
```

### 组件级别配置
也可以直接在组件中传递API URL：
```vue
<NetworkMap api-url="https://custom-api.example.com/nodes" />
<peeringcard api-url="https://custom-api.example.com/nodes" />
```

## 数据格式

节点数据应该符合以下JSON格式：
```json
[
  {
    "id": "unique-node-id",
    "name": "Node Display Name",
    "lat": 50.1109,
    "lng": 8.6821,
    "type": "primary", // 或 "secondary"
    "provider": "Provider Name",
    "connections": ["other-node-id-1", "other-node-id-2"]
  }
]
```

## 错误处理

- 如果API调用失败，系统会自动使用内置的备用数据
- 加载过程中显示加载指示器
- 错误信息会记录到控制台，但不会中断用户体验

## 使用示例

### 基本使用（使用环境变量配置）
```vue
<template>
  <NetworkMap />
  <peeringcard />
</template>
```

### 自定义API端点
```vue
<template>
  <NetworkMap api-url="https://my-api.com/nodes" />
  <peeringcard api-url="https://my-api.com/nodes" />
</template>
```

## 开发建议

1. **本地开发**：使用本地JSON文件进行开发和测试
2. **生产环境**：配置实际的API端点
3. **错误监控**：在生产环境中监控API调用的成功率
4. **缓存策略**：考虑在NodeService中添加缓存机制以提高性能

## 扩展性

NodeService设计为可扩展的：
- 可以添加缓存机制
- 可以添加数据验证
- 可以添加更多的数据转换逻辑
- 可以支持多种数据源格式
