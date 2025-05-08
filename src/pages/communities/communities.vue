<script setup lang="ts">
defineOptions({
    name: 'CommunitiesPage'
})
</script>

<template>
    <v-container fluid class="pa-0" style="background-color: var(--v-theme-background)">
        <div class="header-background" />

        <v-container class="px-4 pt-6">
            <v-btn
                color="primary"
                variant="outlined"
                prepend-icon="mdi-arrow-left"
                class="back-button"
                @click="$router.push('/')"
            >
                返回主页
            </v-btn>
        </v-container>

        <v-row justify="center" class="mt-12 mb-8">
            <v-col cols="12" md="10" lg="8" class="text-center">
                <h2 class="text-h3 font-weight-medium primary--text">
                    <v-icon size="x-large" color="primary" class="mr-3">mdi-star</v-icon>
                    BGP Communities
                </h2>
                <div class="mt-3 text-medium-emphasis">
                    Detailed BGP community policy and routing control information
                </div>
            </v-col>
        </v-row>

        <v-row justify="center" class="mb-12">
            <v-col cols="12" md="10" lg="8">
                <v-card elevation="2" class="rounded-lg community-card">
                    <v-card-title class="text-h5 primary--text pt-5 px-6">
                        <v-icon color="primary" class="mr-3">mdi-tag-multiple</v-icon>
                        BGP Communities
                    </v-card-title>
                    <v-card-subtitle class="px-6 pb-2 pt-2">
                        Below is a list of BGP communities supported by our network for
                        routing policy control
                    </v-card-subtitle>

                    <v-card-text class="px-4 pt-2">
                        <v-table class="community-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Community Value</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>No Export to Peers</td>
                                    <td class="text-primary font-weight-medium">
                                        888888:1000
                                    </td>
                                    <td>
                                        This prefix will not be announced to any peering
                                        partners
                                    </td>
                                </tr>
                                <tr>
                                    <td>Region: Asia</td>
                                    <td class="text-primary font-weight-medium">
                                        888888:2001
                                    </td>
                                    <td>Marks routes from the Asia region</td>
                                </tr>
                                <tr>
                                    <td>Region: Europe</td>
                                    <td class="text-primary font-weight-medium">
                                        888888:2002
                                    </td>
                                    <td>Marks routes from the Europe region</td>
                                </tr>
                                <tr>
                                    <td>Region: North America</td>
                                    <td class="text-primary font-weight-medium">
                                        888888:2003
                                    </td>
                                    <td>Marks routes from the North America region</td>
                                </tr>
                                <tr>
                                    <td>Priority: High</td>
                                    <td class="text-primary font-weight-medium">
                                        888888:3001
                                    </td>
                                    <td>High priority routes</td>
                                </tr>
                                <tr>
                                    <td>Priority: Medium</td>
                                    <td class="text-primary font-weight-medium">
                                        888888:3002
                                    </td>
                                    <td>Medium priority routes</td>
                                </tr>
                                <tr>
                                    <td>Priority: Low</td>
                                    <td class="text-primary font-weight-medium">
                                        888888:3003
                                    </td>
                                    <td>Low priority routes</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>

                    <v-card-actions class="px-6 pb-4">
                        <v-spacer />
                        <v-btn
                            color="primary"
                            variant="text"
                            prepend-icon="mdi-download"
                            href="#"
                            class="text-button"
                        >
                            Download Complete Community List
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>

        <v-row justify="center" class="mb-12">
            <v-col cols="12" md="10" lg="8">
                <v-card elevation="2" class="rounded-lg community-card">
                    <v-card-title class="text-h5 primary--text pt-5 px-6">
                        <v-icon color="primary" class="mr-3">mdi-tag-multiple</v-icon>
                        BGP Community attributes
                    </v-card-title>
                    <v-card-subtitle class="px-6 pb-2 pt-2">
                        Below is a list of BGP communities supported by our network for
                        routing policy control
                    </v-card-subtitle>

                    <!-- 内部Community -->
                    <v-card-title class="text-h6 primary--text pt-4 px-6">
                        <v-icon color="primary" class="mr-3" size="small">mdi-tag</v-icon>
                        Internal Community
                    </v-card-title>
                    <v-card-text class="px-4 pt-2">
                        <v-table class="community-table">
                            <thead>
                                <tr>
                                    <th>Community Value</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="text-primary font-weight-medium">
                                        (114514, &lt;999, 0)
                                    </td>
                                    <td>Community for all my node</td>
                                </tr>
                                <tr>
                                    <td class="text-primary font-weight-medium">
                                        (114514, &lt;999, 1)
                                    </td>
                                    <td>Community only for this node</td>
                                </tr>
                                <tr>
                                    <td class="text-primary font-weight-medium">
                                        (114514, 101, *)
                                    </td>
                                    <td>allow bgp_local_perf</td>
                                </tr>
                                <tr>
                                    <td class="text-primary font-weight-medium">
                                        (114514, 209, *)
                                    </td>
                                    <td>ibgp routes</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>

                    <!-- 控制类 -->
                    <v-card-title class="text-h6 primary--text pt-4 px-6">
                        <v-icon color="primary" class="mr-3" size="small"
                            >mdi-filter</v-icon
                        >
                        Control Community
                    </v-card-title>
                    <v-card-text class="px-4 pt-2">
                        <v-table class="community-table">
                            <thead>
                                <tr>
                                    <th>Community Value</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="text-primary font-weight-medium">
                                        (114514, 1, *)
                                    </td>
                                    <td>do not send to ibgp</td>
                                </tr>
                                <tr>
                                    <td class="text-primary font-weight-medium">
                                        (114514, 2, *)
                                    </td>
                                    <td>do not send to ebgp</td>
                                </tr>
                                <tr>
                                    <td class="text-primary font-weight-medium">
                                        (114514, 3, *)
                                    </td>
                                    <td>do not send to kernel</td>
                                </tr>
                                <tr>
                                    <td class="text-primary font-weight-medium">
                                        (114514, 4, *)
                                    </td>
                                    <td>send to kernel but mark unreachable</td>
                                </tr>
                                <tr>
                                    <td class="text-primary font-weight-medium">
                                        (114514, 5, *)
                                    </td>
                                    <td>send to kernel but mark blackhole</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>

                    <!-- 信息类 -->
                    <v-card-title class="text-h6 primary--text pt-4 px-6">
                        <v-icon color="primary" class="mr-3" size="small"
                            >mdi-information-outline</v-icon
                        >
                        Information Community
                    </v-card-title>
                    <v-card-text class="px-4 pt-2">
                        <v-table class="community-table">
                            <thead>
                                <tr>
                                    <th>Community Value</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="text-primary font-weight-medium">
                                        (114514, 201, *)
                                    </td>
                                    <td>transit routes</td>
                                </tr>
                                <tr>
                                    <td class="text-primary font-weight-medium">
                                        (114514, 202, *)
                                    </td>
                                    <td>ixp rs routes</td>
                                </tr>
                                <tr>
                                    <td class="text-primary font-weight-medium">
                                        (114514, 203, *)
                                    </td>
                                    <td>peer routes</td>
                                </tr>
                                <tr>
                                    <td class="text-primary font-weight-medium">
                                        (114514, 204, *)
                                    </td>
                                    <td>customer routes</td>
                                </tr>
                                <tr>
                                    <td class="text-primary font-weight-medium">
                                        (114514, 10000, region_code)
                                    </td>
                                    <td>Received from region</td>
                                </tr>
                                <tr>
                                    <td class="text-primary font-weight-medium">
                                        (114514, 10001, country_code)
                                    </td>
                                    <td>Received from country</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>

                    <v-card-actions class="px-6 pb-4">
                        <v-spacer />
                        <v-btn
                            color="primary"
                            variant="text"
                            prepend-icon="mdi-download"
                            href="#"
                            class="text-button"
                        >
                            Download Complete Community List
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped lang="scss">
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

.back-button {
    position: relative;
    z-index: 1;
    transition: all 0.2s ease;

    &:hover {
        transform: translateX(-4px);
    }
}

.community-card {
    border: 1px solid rgba(var(--v-theme-primary), 0.1);
    overflow: hidden;
    transition: all 0.3s ease;

    &:hover {
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }
}

.community-table {
    border-collapse: separate;
    border-spacing: 0;

    th {
        background-color: rgba(var(--v-theme-primary), 0.05);
        padding: 12px 16px;
        font-weight: 600;
    }

    td {
        padding: 12px 16px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }

    tr:last-child td {
        border-bottom: none;
    }

    tr:hover {
        background-color: rgba(var(--v-theme-primary), 0.03);
    }
}

.text-button {
    letter-spacing: 0.5px;
    font-weight: 500;
}
</style>
