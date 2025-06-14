<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()

defineOptions({
    name: 'TipsComponent'
})

const props = defineProps({
    borderColor: {
        type: String,
        default: '#f06292'
    },
    lightBackground: {
        type: String,
        default: '#fff0f6'
    },
    darkBackground: {
        type: String,
        default: '#301624'
    }
})

const CardStyle = computed(() => {
    return {
        borderLeft: `6px solid ${props.borderColor}`,
        background: theme.global.current.value.dark ? props.darkBackground : props.lightBackground,
        marginLeft: '12px',
        marginRight: '12px'
    }
})
</script>

<template>
    <v-card class="mb-4 px-4 py-2 d-flex align-center" :style="CardStyle" flat>
        <div style="font-family: monospace">
            <slot/>
        </div>
    </v-card>
</template>