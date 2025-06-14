<script setup lang="ts">
import TipsComponent from '@/components/tips.vue'

defineOptions({
    name: 'CommunitiesPage'
})
</script>

<template>
    <v-container fluid>
        <div class="header-background" />

        <v-row justify="center" class="mt-12 mb-8">
            <v-col cols="12" md="10" lg="8" class="text-center">
                <h2 class="text-h3 font-weight-medium primary--text">
                    <v-icon color="primary" class="mr-3">mdi-star</v-icon>
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
                        BGP Community attributes
                    </v-card-title>
                    <v-card-subtitle class="px-6 pb-2 pt-2">
                        Below is a list of BGP communities supported by our network for
                        routing policy control
                    </v-card-subtitle>

                    <!-- Internal Community -->
                    <v-card-title class="text-h6 primary--text pt-4 px-6">
                        <v-icon color="primary" class="mr-3" size="small">mdi-tag</v-icon>
                        Internal Community
                    </v-card-title>
                    <v-card-text class="px-4 pt-2">
                        <TipsComponent>
                            &nbsp;(207529, <999, 0)&nbsp;&nbsp;Community for all my
                            node<br />
                            &nbsp;(207529, <999, 1)&nbsp;&nbsp;Community only for this
                            node<br />
                        </TipsComponent>
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
                                        (207529, &lt;999, 0)
                                    </td>
                                    <td>Community for all my node</td>
                                </tr>
                                <tr>
                                    <td class="text-primary font-weight-medium">
                                        (207529, &lt;999, 1)
                                    </td>
                                    <td>Community only for this node</td>
                                </tr>
                                <tr>
                                    <td class="text-primary font-weight-medium">
                                        (207529, 1, *)
                                    </td>
                                    <td>do not send to ibgp</td>
                                </tr>
                                <tr>
                                    <td class="text-primary font-weight-medium">
                                        (207529, 2, *)
                                    </td>
                                    <td>do not send to ebgp</td>
                                </tr>
                                <tr>
                                    <td class="text-primary font-weight-medium">
                                        (207529, 3, *)
                                    </td>
                                    <td>do not send to kernel</td>
                                </tr>
                                <tr>
                                    <td class="text-primary font-weight-medium">
                                        (207529, 4, *)
                                    </td>
                                    <td>send to kernel but mark unreachable</td>
                                </tr>
                                <tr>
                                    <td class="text-primary font-weight-medium">
                                        (207529, 5, *)
                                    </td>
                                    <td>send to kernel but mark blackhole</td>
                                </tr>
                                <tr>
                                    <td class="text-primary font-weight-medium">
                                        (207529, 101, *)
                                    </td>
                                    <td>allow bgp_local_perf</td>
                                </tr>
                                <tr>
                                    <td class="text-primary font-weight-medium">
                                        (207529, 201, *)
                                    </td>
                                    <td>transit routes</td>
                                </tr>
                                <tr>
                                    <td class="text-primary font-weight-medium">
                                        (207529, 202, *)
                                    </td>
                                    <td>ixp rs routes</td>
                                </tr>
                                <tr>
                                    <td class="text-primary font-weight-medium">
                                        (207529, 203, *)
                                    </td>
                                    <td>peer routes</td>
                                </tr>
                                <tr>
                                    <td class="text-primary font-weight-medium">
                                        (207529, 204, *)
                                    </td>
                                    <td>customer routes</td>
                                </tr>
                                <tr>
                                    <td class="text-primary font-weight-medium">
                                        (207529, 209, *)
                                    </td>
                                    <td>ibgp routes</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>

                    <!-- Control Community -->
                    <v-card-title class="text-h6 primary--text pt-4 px-6">
                        <v-icon color="primary" class="mr-3" size="small"
                            >mdi-filter</v-icon
                        >
                        Control Community
                    </v-card-title>
                    <v-card-text class="px-4 pt-2">

                        <TipsComponent>
                            <strong>Actions:</strong><br />
                            &nbsp;* = 0 &nbsp;&nbsp;do not announce to target<br />
                            &nbsp;* = 1 &nbsp;&nbsp;prepend 1 to target<br />
                            &nbsp;* = 2 &nbsp;&nbsp;prepend 2 to target<br />
                            &nbsp;* = 4 &nbsp;&nbsp;prepend 4 to target<br />
                            &nbsp;* = 8 &nbsp;&nbsp;prepend 8 to target
                        </TipsComponent>

                        <div>
                            <h4 class="font-weight-medium mb-2">
                                Action target selector:
                            </h4>
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
                                            (207529, 1*00, 0)
                                        </td>
                                        <td>Do action to everyone</td>
                                    </tr>
                                    <tr>
                                        <td class="text-primary font-weight-medium">
                                            (207529, 1*01, asn)
                                        </td>
                                        <td>Don't do action to this asn</td>
                                    </tr>
                                    <tr>
                                        <td class="text-primary font-weight-medium">
                                            (207529, 1*02, asn)
                                        </td>
                                        <td>Do action to this asn</td>
                                    </tr>
                                    <tr>
                                        <td class="text-primary font-weight-medium">
                                            (207529, 1*10, 0)
                                        </td>
                                        <td>Do action to every region</td>
                                    </tr>
                                    <tr>
                                        <td class="text-primary font-weight-medium">
                                            (207529, 1*11, region_code)
                                        </td>
                                        <td>Don't do action to this region</td>
                                    </tr>
                                    <tr>
                                        <td class="text-primary font-weight-medium">
                                            (207529, 1*12, region_code)
                                        </td>
                                        <td>Do action to this region</td>
                                    </tr>
                                    <tr>
                                        <td class="text-primary font-weight-medium">
                                            (207529, 1019, 0)
                                        </td>
                                        <td>
                                            Disable (asn, 1010, 0), (asn, 1011,
                                            local_region) as default value
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-primary font-weight-medium">
                                            (207529, 1*20, 0)
                                        </td>
                                        <td>Do action to every country</td>
                                    </tr>
                                    <tr>
                                        <td class="text-primary font-weight-medium">
                                            (207529, 1*21, country_code)
                                        </td>
                                        <td>Don't do action to this country</td>
                                    </tr>
                                    <tr>
                                        <td class="text-primary font-weight-medium">
                                            (207529, 1*22, country_code)
                                        </td>
                                        <td>Do action to this country</td>
                                    </tr>
                                    <tr>
                                        <td class="text-primary font-weight-medium">
                                            (207529, 1*30, 1)
                                        </td>
                                        <td>Do action to upstreams</td>
                                    </tr>
                                    <tr>
                                        <td class="text-primary font-weight-medium">
                                            (207529, 1*30, 2)
                                        </td>
                                        <td>Do action to ixp rs</td>
                                    </tr>
                                    <tr>
                                        <td class="text-primary font-weight-medium">
                                            (207529, 1*30, 3)
                                        </td>
                                        <td>Do action to peers</td>
                                    </tr>
                                    <tr>
                                        <td class="text-primary font-weight-medium">
                                            (207529, 1*30, 4)
                                        </td>
                                        <td>Do action to downstreams</td>
                                    </tr>
                                    <tr>
                                        <td class="text-primary font-weight-medium">
                                            (207529, 1*30, 8)
                                        </td>
                                        <td>Do action to route collectors</td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </div>
                    </v-card-text>

                    <!-- Informational Community -->
                    <v-card-title class="text-h6 primary--text pt-4 px-6">
                        <v-icon color="primary" class="mr-3" size="small"
                            >mdi-information-outline</v-icon
                        >
                        Informational Community
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
                                        (207529, 10000, region_code)
                                    </td>
                                    <td>Received from region</td>
                                </tr>
                                <tr>
                                    <td class="text-primary font-weight-medium">
                                        (207529, 10001, country_code)
                                    </td>
                                    <td>Received from country</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>

                    <!-- Region Code -->
                    <v-card-title class="text-h6 primary--text pt-4 px-6">
                        <v-icon color="primary" class="mr-3" size="small"
                            >mdi-information-outline</v-icon
                        >
                        Region code
                    </v-card-title>
                    <v-card-text class="px-4 pt-2">
                        <v-table class="community-table">
                            <thead>
                                <tr>
                                    <th>Region Code</th>
                                    <th>Region</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="text-primary font-weight-medium">41</td>
                                    <td>Europe</td>
                                </tr>
                                <tr>
                                    <td class="text-primary font-weight-medium">42</td>
                                    <td>North America-East</td>
                                </tr>
                                <tr>
                                    <td class="text-primary font-weight-medium">43</td>
                                    <td>North America-Central</td>
                                </tr>
                                <tr>
                                    <td class="text-primary font-weight-medium">44</td>
                                    <td>North America-West</td>
                                </tr>
                                <tr>
                                    <td class="text-primary font-weight-medium">45</td>
                                    <td>Central America</td>
                                </tr>
                                <tr>
                                    <td class="text-primary font-weight-medium">46</td>
                                    <td>South America-Central</td>
                                </tr>
                                <tr>
                                    <td class="text-primary font-weight-medium">47</td>
                                    <td>South America-West</td>
                                </tr>
                                <tr>
                                    <td class="text-primary font-weight-medium">48</td>
                                    <td>Africa-N (above Sahara)</td>
                                </tr>
                                <tr>
                                    <td class="text-primary font-weight-medium">49</td>
                                    <td>Africa-S (below Sahara)</td>
                                </tr>
                                <tr>
                                    <td class="text-primary font-weight-medium">50</td>
                                    <td>Asia-S (IN, PK, BD)</td>
                                </tr>
                                <tr>
                                    <td class="text-primary font-weight-medium">51</td>
                                    <td>Asia-SE (TH, SG, PH, ID, MY)</td>
                                </tr>
                                <tr>
                                    <td class="text-primary font-weight-medium">52</td>
                                    <td>Asia-E (JP, KR, TW, HK, CN)</td>
                                </tr>
                                <tr>
                                    <td class="text-primary font-weight-medium">53</td>
                                    <td>Pacific&Oceania (AU, NZ, FJ)</td>
                                </tr>
                                <tr>
                                    <td class="text-primary font-weight-medium">54</td>
                                    <td>Antarctica</td>
                                </tr>
                                <tr>
                                    <td class="text-primary font-weight-medium">55</td>
                                    <td>Asia-N (RU)</td>
                                </tr>
                                <tr>
                                    <td class="text-primary font-weight-medium">56</td>
                                    <td>Asia-W (IR, TR, UAE)</td>
                                </tr>
                                <tr>
                                    <td class="text-primary font-weight-medium">57</td>
                                    <td>Central Asia (AF, UZ, KZ)</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>

                    <!-- Country Code -->
                    <v-card-title class="text-h6 primary--text pt-4 px-6">
                        <v-icon color="primary" class="mr-3" size="small"
                            >mdi-information-outline</v-icon
                        >
                        Country code
                    </v-card-title>
                    <v-card-text class="px-4 pt-2">
                        <p>ISO-3166 numeric-3 country code</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer />
                        <v-btn
                            color="primary"
                            variant="text"
                            prepend-icon="mdi-download"
                            href="/assets/communities-list.md"
                        >
                            Download full community list
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

.community-code {
    background-color: rgba(var(--v-theme-primary), 0.05);
    border-radius: 8px;
    padding: 16px;
    font-family: 'Courier New', Courier, monospace;
    white-space: pre;
    overflow-x: auto;
    font-size: 14px;
    margin-top: 8px;
    margin-bottom: 8px;
    line-height: 1.5;
}
</style>
