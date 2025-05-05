<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
    name: 'InformationComponent'
})

const showIpv6Blocks = ref(false)
const ipv6BlockCount = ref(2)
const ipv6Blocks = ref([
    { prefix: '2400:cb00::/32', usage: "I don't know what this is used for" },
    { prefix: '2606:4700::/32', usage: "I also don't know what this is used for" }
])
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
                    <div class="info-value">888888</div>
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
                    </div>
                    <div class="info-value">{{ ipv6BlockCount }} address blocks</div>
                </div>

                <v-expand-transition>
                    <div v-if="showIpv6Blocks">
                        <v-card variant="tonal">
                            <v-table density="compact">
                                <thead>
                                    <tr>
                                        <th>Address Prefix</th>
                                        <th>Usage</th>
                                    </tr>
                                </thead>
                                <tbody>
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
                    <div class="info-value">2024 to Present</div>
                </div>

                <div class="info-item">
                    <div class="info-label">
                        <v-icon size="small" color="primary" class="me-1"
                            >mdi-database</v-icon
                        >
                        PeeringDB
                    </div>
                    <div class="info-value">net.peeringdb.com/AS114514</div>
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
                    <div class="info-value">
                        Research & Education Network
                    </div>
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
