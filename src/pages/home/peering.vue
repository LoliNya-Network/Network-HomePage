<script setup lang="ts">
import { computed } from 'vue'

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

// Peering组件
defineOptions({
    name: 'PeeringComponent'
})

// 格式化位置名称显示
const formatLocationName = (node: NetworkNode) => {
  return `${node.name} - ${node.provider}`
}
</script>

<template>
    <v-card elevation="2" height="100%" class="rounded-lg peering-card">
        <v-card-title class="d-flex align-center py-4 px-4 gradient-header">
            <v-avatar color="primary" class="me-3" size="42">
                <v-icon color="white" size="24">mdi-access-point-network</v-icon>
            </v-avatar>
            <span class="text-h5 font-weight-bold">Peering</span>
        </v-card-title>

        <v-card-text class="px-4 py-4">
            <div class="mb-5 description-text">
                Providing IPv6 interconnection for research, educational institutions, and
                academic networks to support academic exchange and technological
                innovation.
            </div>

            <v-divider class="mb-4"></v-divider>

            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">
                        <v-icon size="small" color="primary" class="me-1"
                            >mdi-handshake</v-icon
                        >
                        Peering Policy
                    </div>
                    <div class="info-value">Open Peering</div>
                </div>

                <div class="info-item">
                    <div class="info-label">
                        <v-icon size="small" color="primary" class="me-1"
                            >mdi-check-circle-outline</v-icon
                        >
                        Peer Requirements
                    </div>
                    <div class="info-value">Any IXP we are present.</div>
                </div>

                <div class="info-item">
                    <div class="info-label">
                        <v-icon size="small" color="primary" class="me-1"
                            >mdi-email-outline</v-icon
                        >
                        Contact Email
                    </div>
                    <div class="info-value">noc@lolinya.net</div>
                </div>

                <div class="info-item">
                    <div class="info-label">
                        <v-icon size="small" color="primary" class="me-1"
                            >mdi-vector-polyline</v-icon
                        >
                        Supported Protocols
                    </div>
                    <div class="info-value">
                        GRE, VXLAN, WireGuard
                        <v-chip size="x-small" class="ms-1">IPv6 Only</v-chip>
                    </div>
                </div>
            </div>

            <v-divider class="my-4"></v-divider>

            <div>
                <div class="info-label mb-3">
                    <v-icon size="small" color="primary" class="me-1"
                        >mdi-map-marker-multiple</v-icon
                    >
                    Exchange Points
                </div>
                <div v-if="loading" class="d-flex align-center">
                    <v-progress-circular
                        indeterminate
                        color="primary"
                        size="20"
                        class="me-2"
                    ></v-progress-circular>
                    <span class="text-caption">Loading exchange points...</span>
                </div>
                <div v-else-if="error" class="d-flex align-center">
                    <v-icon color="error" size="20" class="me-2">mdi-alert-circle</v-icon>
                    <span class="text-caption text-error">{{ error }}</span>
                </div>
                <div v-else class="d-flex flex-wrap">
                    <v-chip
                        v-for="node in nodes"
                        :key="node.id"
                        :color="node.type === 'primary' ? 'primary' : 'secondary'"
                        variant="outlined"
                        size="small"
                        class="me-2 mb-2"
                    >
                        <v-icon start size="small">mdi-access-point</v-icon>
                        {{ formatLocationName(node) }}
                    </v-chip>
                    <v-chip
                        v-if="nodes.length === 0"
                        color="grey"
                        variant="outlined"
                        size="small"
                        class="me-2 mb-2"
                    >
                        <v-icon start size="small">mdi-alert-circle-outline</v-icon>
                        No exchange points available
                    </v-chip>
                </div>
            </div>
        </v-card-text>
    </v-card>
</template>

<style lang="scss" scoped>
.gradient-header {
    background: linear-gradient(to right, rgb(var(--v-theme-primary), 0.05), transparent);
    border-bottom: 1px solid rgb(var(--v-theme-primary), 0.1);
}

.description-text {
    color: rgba(var(--v-theme-on-surface), 0.75);
    line-height: 1.6;
}

.info-grid {
    display: grid;
    gap: 1rem;
}

.info-item {
    margin-bottom: 0.5rem;
}

.info-label {
    font-size: 0.875rem;
    font-weight: 600;
    color: rgba(var(--v-theme-on-surface), 0.7);
    margin-bottom: 0.25rem;
    display: flex;
    align-items: center;
}

.info-value {
    font-size: 1rem;
    display: flex;
    align-items: center;
    padding-left: 1.5rem;
}
</style>
