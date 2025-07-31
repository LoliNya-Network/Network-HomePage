<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useTheme } from 'vuetify'
import peeringcard from './peering.vue'
import informationcard from './information.vue'
import featureCard from './featureCard.vue'
import TipsComponent from '@/components/tips.vue'
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
        title: 'Open Peering',
        icon: 'mdi-vector-link',
        content:
            'Welcome peering with other research and education networks and academic institutions'
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
                        <v-icon color="primary" class="mr-2"
                            >mdi-tag</v-icon
                        >
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
                        <peeringcard :nodes="networkNodes" :loading="loading" :error="error" />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>

        <v-row justify="center" class="my-6">
            <v-col cols="12" md="10" lg="8">
                <v-card elevation="1" class="rounded-lg">
                    <v-card-title class="text-h5 primary--text">
                        <v-icon color="primary" class="mr-2">mdi-tag-multiple</v-icon>
                        BGP Communities
                    </v-card-title>
                    <v-card-subtitle class="pb-0">
                        Below is a list of BGP communities supported by our network for
                        routing policy control
                    </v-card-subtitle>

                    <TipsComponent class="mt-4 mb-2">
                        <strong>Actions:</strong><br />
                        &nbsp;* = 0 &nbsp;&nbsp;do not announce to target<br />
                        &nbsp;* = 1 &nbsp;&nbsp;prepend 1 to target<br />
                        &nbsp;* = 2 &nbsp;&nbsp;prepend 2 to target<br />
                        &nbsp;* = 4 &nbsp;&nbsp;prepend 4 to target<br />
                        &nbsp;* = 8 &nbsp;&nbsp;prepend 8 to target
                    </TipsComponent>

                    <p class="ml-4">Action target selector:</p>
                    <p class="ml-4">* = Action</p>

                    <v-table class="mb-4">
                        <thead>
                            <tr>
                                <th>Community Value</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>(207529, 1*00, 0)</td>
                                <td>Do action to everyone</td>
                            </tr>
                            <tr>
                                <td>(207529, 1*01, asn)</td>
                                <td>Don't do action to this asn</td>
                            </tr>
                            <tr>
                                <td>(207529, 1*02, asn)</td>
                                <td>Do action to this asn</td>
                            </tr>
                            <tr>
                                <td>(207529, 1*10, 0)</td>
                                <td>Do action to every region</td>
                            </tr>
                            <tr>
                                <td>(207529, 1*11, region_code)</td>
                                <td>Don't do action to this region</td>
                            </tr>
                            <tr>
                                <td>(207529, 1*12, region_code)</td>
                                <td>Do action to this region</td>
                            </tr>
                            <tr>
                                <td>(207529, 1019, 0)</td>
                                <td>
                                    Disable (asn, 1010, 0), (asn, 1011, local_region) as
                                    default value
                                </td>
                            </tr>
                            <tr>
                                <td>(207529, 1*20, 0)</td>
                                <td>Do action to every country</td>
                            </tr>
                            <tr>
                                <td>(207529, 1*21, country_code)</td>
                                <td>Don't do action to this country</td>
                            </tr>
                            <tr>
                                <td>(207529, 1*22, country_code)</td>
                                <td>Do action to this country</td>
                            </tr>
                            <tr>
                                <td>(207529, 1*30, 1)</td>
                                <td>Do action to upstreams</td>
                            </tr>
                            <tr>
                                <td>(207529, 1*30, 2)</td>
                                <td>Do action to ixp rs</td>
                            </tr>
                            <tr>
                                <td>(207529, 1*30, 3)</td>
                                <td>Do action to peers</td>
                            </tr>
                            <tr>
                                <td>(207529, 1*30, 4)</td>
                                <td>Do action to downstreams</td>
                            </tr>
                            <tr>
                                <td>(207529, 1*30, 8)</td>
                                <td>Do action to route collectors</td>
                            </tr>
                        </tbody>
                    </v-table>

                    <v-card-actions>
                        <v-spacer />
                        <v-btn
                            color="primary"
                            variant="text"
                            prepend-icon="mdi-tag-outline"
                            href="/communities"
                        >
                            View full community list
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>

        <v-row justify="center" class="my-6">
            <v-col cols="12" md="10" lg="8">
                <v-card color="primary" class="text-center py-4 px-2 rounded-lg">
                    <v-card-title class="text-h4 text-white">CONTACT US</v-card-title>
                    <v-card-text>
                        <v-row justify="center" class="mt-2">
                            <v-col cols="12" sm="4" class="d-flex justify-center">
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
                            <v-col cols="12" sm="4" class="d-flex justify-center">
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
                            <v-col cols="12" sm="4" class="d-flex justify-center">
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
