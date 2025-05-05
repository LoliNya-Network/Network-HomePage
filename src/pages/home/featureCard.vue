<script setup lang="ts">
defineOptions({
    name: 'FeatureCard'
})

interface Props {
    title: string
    icon: string
    content: string
}

const props = withDefaults(defineProps<Props>(), {
    title: '',
    icon: '',
    content: ''
})
</script>

<template>
    <v-card height="100%" class="d-flex flex-column">
        <v-card-title class="d-flex align-center py-4 px-4 gradient-header">
            <v-avatar color="primary" class="me-3" size="42">
                <v-icon color="white" size="24">{{ props.icon }}</v-icon>
            </v-avatar>
            <span class="text-h5 font-weight-bold">{{ props.title }}</span>
        </v-card-title>
        <v-card-text class="content-text py-4 px-4 flex-grow-1 d-flex align-start">
            <div class="text-body-1">{{ props.content }}</div>
        </v-card-text>
    </v-card>
</template>

<style lang="scss" scoped>
.gradient-header {
    background: linear-gradient(to right, rgb(var(--v-theme-primary), 0.05), transparent);
    border-bottom: 1px solid rgb(var(--v-theme-primary), 0.1);
}

.content-text {
    line-height: 1.6;
    font-size: 1rem;
    letter-spacing: 0.03em;

    div {
        width: 100%;
    }
}
</style>
