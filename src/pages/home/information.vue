<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getASPrefixesWithWhois } from '@/hooks/heapi'

defineOptions({
    name: 'InformationComponent'
})

const showIpv6Blocks = ref(false)
const ipv6BlockCount = ref(0)
const ipv6Blocks = ref<Array<{ prefix: string; usage: string }>>([])
const loading = ref(false)
const error = ref('')

// 获取IPv6前缀数据
const fetchIPv6Blocks = async () => {
    loading.value = true
    error.value = ''
    try {
        const data = await getASPrefixesWithWhois(207529)
        
        // 过滤出IPv6前缀并转换格式
        const ipv6Prefixes = data
            .filter(item => item.Prefix.includes(':')) // 过滤IPv6地址
            .map(item => ({
                prefix: item.Prefix,
                usage: item.Org || item.countrydata.Iso3166_Name || 'Unknown usage'
            }))
        
        ipv6Blocks.value = ipv6Prefixes
        ipv6BlockCount.value = ipv6Prefixes.length
    } catch (err) {
        console.error('Failed to fetch IPv6 blocks:', err)
        error.value = 'Failed to load IPv6 blocks'
        ipv6Blocks.value = []
        ipv6BlockCount.value = 0
    } finally {
        loading.value = false
    }
}

// 组件挂载时获取数据
onMounted(() => {
    fetchIPv6Blocks()
})

</script>

<template>
    <v-card elevation="2" height="100%" class="rounded-lg information-card">
        <v-card-title class="d-flex align-center py-4 px-4 gradient-header">
            <v-avatar color="primary" class="me-3" size="42">
                <v-icon color="white" size="24">mdi-information</v-icon>
            </v-avatar>
            <span class="text-h5 font-weight-bold">Network Information</span>
        </v-card-title>

        <v-card-text class="px-4 py-4">
            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">
                        <v-icon size="small" color="primary" class="me-1"
                            >mdi-check-circle</v-icon
                        >
                        ASN
                    </div>
                    <div class="info-value">207529</div>
                </div>

                <div class="info-item">
                    <div class="info-label">
                        <v-icon size="small" color="primary" class="me-1"
                            >mdi-ip-network</v-icon
                        >
                        IPv6 Address Blocks
                        <v-btn
                            variant="text"
                            density="compact"
                            icon="mdi-chevron-down"
                            @click="showIpv6Blocks = !showIpv6Blocks"
                            :class="{ 'rotate-icon': showIpv6Blocks }"
                            aria-label="Toggle IPv6 Address Blocks"
                            class="ms-2"
                        ></v-btn>
                        <v-btn
                            variant="text"
                            density="compact"
                            icon="mdi-refresh"
                            @click="fetchIPv6Blocks"
                            :loading="loading"
                            aria-label="Refresh IPv6 Blocks"
                            class="ms-1"
                        ></v-btn>
                    </div>
                    <div class="info-value">
                        <span v-if="loading">Loading...</span>
                        <span v-else-if="error" class="text-error">{{ error }}</span>
                        <span v-else>{{ ipv6BlockCount }} address blocks</span>
                    </div>
                </div>

                <v-expand-transition>
                    <div v-if="showIpv6Blocks">
                        <v-card variant="tonal">
                            <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>
                            <div v-if="error" class="pa-4 text-center text-error">
                                {{ error }}
                                <v-btn 
                                    variant="text" 
                                    color="primary" 
                                    @click="fetchIPv6Blocks"
                                    class="ml-2"
                                >
                                    Retry
                                </v-btn>
                            </div>
                            <v-table v-else density="compact">
                                <thead>
                                    <tr>
                                        <th>Address Prefix</th>
                                        <th>Usage</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="ipv6Blocks.length === 0 && !loading">
                                        <td colspan="2" class="text-center text-disabled pa-4">
                                            No IPv6 blocks found
                                        </td>
                                    </tr>
                                    <tr v-for="(block, index) in ipv6Blocks" :key="index">
                                        <td class="text-primary font-weight-medium">
                                            {{ block.prefix }}
                                        </td>
                                        <td>{{ block.usage }}</td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </v-card>
                    </div>
                </v-expand-transition>

                <v-divider />

                <div class="info-item">
                    <div class="info-label">
                        <v-icon size="small" color="primary" class="me-1"
                            >mdi-calendar-check</v-icon
                        >
                        Operating Since
                    </div>
                    <div class="info-value">2025 to Present</div>
                </div>

                <div class="info-item">
                    <div class="info-label">
                        <v-icon size="small" color="primary" class="me-1"
                            >mdi-database</v-icon
                        >
                        PeeringDB
                    </div>
                    <div class="info-value">peeringdb.com/net/29458</div>
                </div>

                <v-divider />

                <div class="info-item">
                    <div class="info-label">
                        <v-icon size="small" color="primary" class="me-1"
                            >mdi-account-group</v-icon
                        >
                        Operator
                    </div>
                    <div class="info-value">LoliNya Technology Ltd.</div>
                </div>

                <div class="info-item">
                    <div class="info-label">
                        <v-icon size="small" color="primary" class="me-1">mdi-lan</v-icon>
                        Network Type
                    </div>
                    <div class="info-value">Research & Education Network</div>
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

.rotate-icon {
    transform: rotate(180deg);
}
</style>
