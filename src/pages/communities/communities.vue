<script setup lang="ts">
defineOptions({
    name: 'CommunitiesPage'
})
</script>

<template>
    <v-container fluid class="pa-0" style="background-color: var(--v-theme-background)">
        <v-row class="d-flex justify-center align-center" style="height: 100vh">
            <v-col cols="12" md="8" lg="6">
                <v-card
                    class="elevation-2 pa-4"
                    style="background-color: var(--v-theme-surface)"
                >
                    <v-card-title class="text-h5 font-weight-bold text-center"
                        >Communities</v-card-title
                    >
                    <v-card-text class="text-center">
                        <p>Welcome to the Communities page!</p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
