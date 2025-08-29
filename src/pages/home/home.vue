<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useTheme } from 'vuetify'
import peeringcard from './peering.vue'
import informationcard from './information.vue'
import featureCard from './featureCard.vue'
import NetworkMap from '@/components/NetworkMap.vue'

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

defineOptions({
    name: 'HomePage'
})

const theme = useTheme()

const nodeApiUrl = import.meta.env.VITE_NODE_API_URL

// 节点数据
const networkNodes = ref<NetworkNode[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// 计算当前应显示的logo
const currentLogo = computed(() => {
    return theme.global.current.value.dark ? '/logo/logo.svg' : '/logo/logo_dark.svg'
})

// 获取网络节点数据
const fetchNetworkNodes = async () => {
    loading.value = true
    error.value = null
    try {
        const response = await fetch(nodeApiUrl)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        networkNodes.value = data
    } catch (err) {
        console.error('Failed to fetch network nodes:', err)
        error.value = err instanceof Error ? err.message : 'Failed to load network data'
        networkNodes.value = []
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchNetworkNodes()
})

// 定义各种卡片的内容数据
const featureCards = [
    {
        title: 'Research & Education',
        icon: 'mdi-school',
        content:
            'Experimental network specifically for research and educational institutions, promoting academic exchange and technological innovation'
    },
    {
        title: 'IPv6 Only',
        icon: 'mdi-network-outline',
        content:
            "Focused on IPv6 technology, no IPv4 connectivity provided, actively embracing next-generation internet protocols (definitely not because we're poor)"
    },
    {
        title: 'Open Peering / Free Transit',
        icon: 'mdi-vector-link',
        content: 'Open peering for all, with free IP transit for research and education.'
    },
    {
        title: 'Professional Operations',
        icon: 'mdi-certificate',
        content:
            'LoliNya Technology Ltd. provides technical support, committed to delivering stable service for research and education'
    }
]
</script>

<template>
    <v-container fluid>
        <div class="header-background" />

        <v-row justify="center" class="header-section pa-4">
            <v-col cols="12" md="10" lg="9" xl="8" class="text-center">
                <div class="d-flex justify-center mb-4">
                    <img
                        :src="currentLogo"
                        alt="LoliNya Network Logo"
                        class="logo-image"
                    />
                </div>
                <h2 class="text-h5 text-grey-darken-1 mb-4">AS207529</h2>
                <div class="text-subtitle-1 text-medium-emphasis mt-4">
                    Research & Education Network
                </div>
                <div class="text-caption text-medium-emphasis mt-2 mb-4">
                    Operated by LoliNya Technology Ltd.
                </div>
            </v-col>
        </v-row>

        <v-row justify="center" class="my-6">
            <v-col cols="12" md="10" lg="8">
                <v-card elevation="1" class="pa-4 rounded-lg">
                    <v-card-title>
                        <v-icon color="primary" class="mr-2">mdi-tag</v-icon>
                        Network Introduction
                    </v-card-title>
                    <v-card-text class="text-body-1">
                        <p>
                            LoliNya Network (AS207529) is a research and education network
                            focused on IPv6 technology learning and research. Operated by
                            LoliNya Technology Ltd., we are dedicated to exploring the
                            application and development of next-generation Internet
                            protocol technologies.
                        </p>
                        <p class="mt-4">
                            This network
                            <span class="text-secondary font-weight-bold"
                                >supports IPv6 only</span
                            >, providing professional technical support and services. We
                            welcome peering with other education and research networks to
                            promote academic exchange and technological innovation.
                        </p>

                        <div class="mt-6">
                            <h3 class="text-h6 mb-3">
                                <v-icon color="primary" class="mr-2"
                                    >mdi-map-marker-multiple</v-icon
                                >
                                Network Nodes
                            </h3>
                            <NetworkMap
                                :nodes="networkNodes"
                                :loading="loading"
                                :error="error"
                                @retry="fetchNetworkNodes"
                            />
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        
        <v-row justify="center" class="my-6">
            <v-col cols="12" md="10" lg="8" class="mb-2 text-center">
                <h2 class="text-h4 font-weight-medium primary--text">
                    <v-icon large color="primary" class="mr-2">mdi-star</v-icon>
                    Network Features
                </h2>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-col cols="12" md="10" lg="8">
                <v-row>
                    <v-col
                        v-for="(card, index) in featureCards"
                        :key="index"
                        cols="12"
                        sm="6"
                    >
                        <featureCard
                            :title="card.title"
                            :icon="card.icon"
                            :content="card.content"
                        />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-spacer />
        <v-row justify="center" class="my-6">
            <v-col cols="12" md="10" lg="8">
                <v-divider class="mb-6" />
                <v-row>
                    <v-col cols="12" md="6">
                        <informationcard />
                    </v-col>
                    <v-col cols="12" md="6">
                        <peeringcard
                            :nodes="networkNodes"
                            :loading="loading"
                            :error="error"
                        />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>

        <v-row justify="center" class="my-6">
            <v-col cols="12" md="10" lg="8">
                <v-sheet elevation="2" class="pa-8 text-center rounded-lg">
                    <v-icon color="primary" size="48" class="mb-4"
                        >mdi-tag-multiple-outline</v-icon
                    >
                    <h3 class="text-h4 font-weight-bold mb-2">BGP Communities</h3>
                    <p class="text-body-1 mb-6">
                        We support a rich set of BGP communities for flexible routing
                        policy control.
                    </p>
                    <v-btn
                        color="primary"
                        variant="tonal"
                        size="large"
                        prepend-icon="mdi-arrow-right-circle-outline"
                        href="/communities"
                        class="font-weight-bold"
                    >
                        View Full List
                    </v-btn>
                </v-sheet>
            </v-col>
        </v-row>

        <v-row justify="center" class="my-6">
            <v-col cols="12" md="10" lg="8">
                <v-card color="primary" class="text-center py-4 px-2 rounded-lg">
                    <v-card-title class="text-h4 text-white">CONTACT US</v-card-title>
                    <v-card-text>
                        <v-row justify="center" class="mt-2 px-10"> </v-row>
                        <v-row justify="center" class="mt-2 px-10">
                            <v-col cols="12" sm="3" class="d-flex justify-center">
                                <v-btn
                                    variant="tonal"
                                    color="white"
                                    class="px-4"
                                    href="mailto:noc@lolinya.net"
                                >
                                    <v-icon start>mdi-email</v-icon>
                                    noc@lolinya.net
                                </v-btn>
                            </v-col>
                            <v-col cols="12" sm="3" class="d-flex justify-center">
                                <v-btn
                                    variant="tonal"
                                    color="white"
                                    class="px-4"
                                    href="https://t.me/Mxmilu"
                                >
                                    <v-icon start>mdi-send</v-icon>
                                    @Mxmilu
                                </v-btn>
                            </v-col>
                            <v-col cols="12" sm="3" class="d-flex justify-center">
                                <v-btn
                                    variant="tonal"
                                    color="white"
                                    class="px-4"
                                    href="https://t.me/Ximi1145"
                                >
                                    <v-icon start>mdi-send</v-icon>
                                    @Ximineko
                                </v-btn>
                            </v-col>
                            <v-col cols="12" sm="3" class="d-flex justify-center">
                                <v-btn
                                    variant="tonal"
                                    color="white"
                                    class="px-4"
                                    href="https://t.me/alongnya"
                                >
                                    <v-icon start>mdi-send</v-icon>
                                    @alongnya
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-text class="text-white text-body-1">
                        <p>
                            If you have any questions or need more information about
                            LoliNya Network, please feel free to contact us
                        </p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-col cols="12" md="10" lg="8">
                <v-footer class="text-center d-block py-4 rounded-lg">
                    <div class="text-subtitle-2 text-medium-emphasis">
                        © {{ new Date().getFullYear() }} LoliNya Network AS207529
                    </div>
                    <div class="text-caption text-medium-emphasis mt-1">
                        LoliNya Network | Research & Education Network | Operated by
                        LoliNya Technology Ltd.
                    </div>
                </v-footer>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.header-section {
    margin-top: 180px;
    margin-bottom: 70px;
    padding-top: 40px;
    padding-bottom: 40px;
    position: relative;
    z-index: 2;
}

.header-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
        circle at 0% 0%,
        rgba(240, 98, 146, 0.15) 0%,
        rgba(240, 98, 146, 0.07) 15%,
        rgba(240, 98, 146, 0.03) 30%,
        transparent 40%
    );
    z-index: 0;
    pointer-events: none;
}

.logo-image {
    width: 550px;
    height: auto;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

@media (min-width: 960px) {
    .logo-image {
        max-width: 110%;
    }
}

@media (min-width: 1200px) {
    .logo-image {
        max-width: 130%;
    }
}
</style>
