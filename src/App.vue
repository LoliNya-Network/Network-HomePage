<script setup lang="ts">
import appbar from '@/components/appbar.vue'

defineOptions({
    name: 'AppComponent'
})
</script>

<template>
    <v-app>
        <appbar />
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<style>
/* 为了避免闪烁，在HTML和body标签上设置背景色过渡 */
html, body {
    transition: background-color 0.3s ease;
}
</style>
