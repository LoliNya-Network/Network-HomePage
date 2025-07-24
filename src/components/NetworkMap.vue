<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// 定义节点数据类型
interface NetworkNode {
  id: string
  name: string
  lat: number
  lng: number
  type: 'primary' | 'secondary'
  provider: string
  connections: string[]
}

interface Props {
  nodes: NetworkNode[]
  loading?: boolean
  error?: string | null
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  error: null
})

const mapContainer = ref<HTMLElement>()
let map: L.Map | null = null
let markers: L.Marker[] = []
let connections: L.Polyline[] = []

// 创建自定义图标
const createIcon = (type: string) => {
  const color = type === 'primary' ? '#f06292' : '#42a5f5'
  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        position: relative;
      "></div>
      <div style="
        background-color: ${color};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        opacity: 0.3;
        position: absolute;
        top: -9px;
        left: -9px;
        animation: pulse 2s infinite;
      "></div>
    `,
    className: 'custom-marker',
    iconSize: [12, 12],
    iconAnchor: [6, 6]
  })
}

// 清除地图上的所有标记和连接线
const clearMap = () => {
  markers.forEach(marker => {
    if (map) {
      map.removeLayer(marker)
    }
  })
  connections.forEach(connection => {
    if (map) {
      map.removeLayer(connection)
    }
  })
  markers = []
  connections = []
}

// 渲染地图标记和连接线
const renderMap = () => {
  if (!map || !props.nodes.length) return

  // 清除现有的标记和连接线
  clearMap()

  // 添加网络节点标记
  props.nodes.forEach((node: NetworkNode) => {
    const marker = L.marker([node.lat, node.lng], {
      icon: createIcon(node.type)
    }).addTo(map!)

    // 添加弹出窗口
    marker.bindPopup(`
      <div style="font-family: 'Roboto', sans-serif;">
        <h4 style="margin: 0 0 8px 0; color: #1976d2;">${node.name}</h4>
        <p style="margin: 4px 0; font-size: 14px;"><strong>Type:</strong> ${node.type === 'primary' ? 'Primary Hub' : 'Secondary Hub'}</p>
        <p style="margin: 4px 0; font-size: 14px;"><strong>Provider:</strong> ${node.provider}</p>
      </div>
    `)

    markers.push(marker)
  })

  // 绘制连接线
  const drawnConnections = new Set() // 避免重复绘制连接线
  
  props.nodes.forEach((node: NetworkNode) => {
    if (node.connections) {
      node.connections.forEach((targetId: string) => {
        const targetNode = props.nodes.find((n: NetworkNode) => n.id === targetId)
        if (targetNode) {
          // 创建连接的唯一标识符
          const connectionKey = [node.id, targetId].sort().join('-')
          
          if (!drawnConnections.has(connectionKey)) {
            const connection = L.polyline(
              [[node.lat, node.lng], [targetNode.lat, targetNode.lng]],
              {
                color: '#64b5f6',
                weight: 2,
                opacity: 0.6,
                dashArray: '5, 10'
              }
            ).addTo(map!)
            
            connections.push(connection)
            drawnConnections.add(connectionKey)
          }
        }
      })
    }
  })
}

// 监听节点数据变化
watch(() => props.nodes, () => {
  if (map) {
    renderMap()
  }
}, { deep: true })

onMounted(() => {
  if (mapContainer.value) {
    // 初始化地图
    map = L.map(mapContainer.value, {
      center: [30, 69],
      zoom: 3,
      zoomControl: true,
      scrollWheelZoom: true,
      dragging: true
    })

    // 添加地图图层
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18
    }).addTo(map)

    // 如果已有节点数据，渲染地图
    if (props.nodes.length) {
      renderMap()
    }
  }
})

onUnmounted(() => {
  clearMap()
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<template>
  <div class="network-map-container">
    <div ref="mapContainer" class="map-container"></div>
    <div v-if="loading" class="loading-overlay">
      <v-progress-circular
        indeterminate
        color="primary"
        size="48"
      ></v-progress-circular>
      <div class="loading-text">Loading network nodes...</div>
    </div>
    <div v-else-if="error" class="error-overlay">
      <v-icon color="error" size="48" class="mb-3">mdi-alert-circle</v-icon>
      <div class="error-text">{{ error }}</div>
      <v-btn 
        color="primary" 
        variant="outlined" 
        size="small" 
        class="mt-3"
        @click="$emit('retry')"
      >
        <v-icon start>mdi-refresh</v-icon>
        Retry
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
.network-map-container {
  width: 100%;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.map-container {
  width: 100%;
  height: 100%;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.error-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loading-text {
  margin-top: 16px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
}

.error-text {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.8);
  text-align: center;
  max-width: 300px;
}

:deep(.custom-marker) {
  background: transparent !important;
  border: none !important;
}

/* 添加脉冲动画 */
@keyframes pulse {
  0% {
    transform: scale(0.8);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.1;
  }
  100% {
    transform: scale(0.8);
    opacity: 0.3;
  }
}

/* 自定义地图控件样式 */
:deep(.leaflet-control-zoom) {
  border: none !important;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
}

:deep(.leaflet-control-zoom a) {
  background-color: white !important;
  color: #1976d2 !important;
  border: none !important;
}

:deep(.leaflet-control-zoom a:hover) {
  background-color: #f5f5f5 !important;
}

/* 自定义弹出窗口样式 */
:deep(.leaflet-popup-content-wrapper) {
  border-radius: 8px !important;
  box-shadow: 0 4px 8px rgba(0,0,0,0.15) !important;
}

:deep(.leaflet-popup-tip) {
  background: white !important;
}
</style>
