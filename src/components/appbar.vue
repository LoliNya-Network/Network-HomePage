<script setup lang="ts">
import { useDisplay } from 'vuetify'
import { useTheme } from 'vuetify'
import { ref, onMounted, computed } from 'vue'

defineOptions({
    name: 'AppBarComponent'
})

const { mobile } = useDisplay()
const theme = useTheme()
const isDark = ref(false)
const prefersDarkMode = ref(false)
const userThemePreference = ref<string | null>(null)

// 从 localStorage 获取用户主题偏好
const getUserThemePreference = (): string | null => {
    return localStorage.getItem('themePreference')
}

// 保存用户主题偏好到 localStorage
const saveUserThemePreference = (themeName: string) => {
    localStorage.setItem('themePreference', themeName)
    userThemePreference.value = themeName
}

// 切换深色/浅色模式
const toggleTheme = () => {
    const newTheme = theme.global.current.value.dark ? 'lightTheme' : 'darkTheme'
    theme.global.name.value = newTheme
    isDark.value = !isDark.value
    // 保存用户的主题选择
    saveUserThemePreference(newTheme)
}

// 检测系统首选颜色模式
const checkPrefersDarkMode = () => {
    prefersDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDarkMode.value
}

// 监听系统颜色模式变化
const setupDarkModeListener = () => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e: MediaQueryListEvent) => {
        prefersDarkMode.value = e.matches
        const newTheme = e.matches ? 'darkTheme' : 'lightTheme'
        theme.global.name.value = newTheme
        isDark.value = e.matches
    }

    mediaQuery.addEventListener('change', handleChange)
}

// 页面加载时设置初始主题
onMounted(() => {
    // 首先检查是否有保存的用户主题偏好
    const savedTheme = getUserThemePreference()
    userThemePreference.value = savedTheme

    if (savedTheme) {
        // 如果有保存的主题偏好，则应用它
        theme.global.name.value = savedTheme
        isDark.value = savedTheme === 'darkTheme'
    } else {
        // 如果没有保存的主题偏好，则使用系统首选主题
        const systemPrefersDark = checkPrefersDarkMode()
        theme.global.name.value = systemPrefersDark ? 'darkTheme' : 'lightTheme'
        isDark.value = systemPrefersDark
    }

    // 设置系统主题变化的监听器
    setupDarkModeListener()
})

// 定义导航链接列表
const navLinks = [
    {
        title: 'PeeringDB',
        icon: 'mdi-database',
        url: 'https://www.peeringdb.com',
        external: true
    },
    { title: 'BGP.Tools', icon: 'mdi-tools', url: 'https://bgp.tools', external: true },
    { title: 'Looking Glass', icon: 'mdi-magnify', url: '#', external: true },
    {
        title: 'BGP Communities',
        icon: 'mdi-tag-multiple',
        url: '/communities',
        external: false
    }
]

const currentLogo = computed(() => {
    return theme.global.current.value.dark ? '/logo/logo.svg' : '/logo/logo_dark.svg'
})
</script>

<template>
    <v-app-bar
        flat
        color="background"
        class="gradient-header app-bar-with-border app-bar-blur"
    >
        <v-app-bar-title>
            <div class="d-flex align-center">
                <img
                    :style="{ 'max-width': mobile ? '170px' : '200px' }"
                    :src="currentLogo"
                    alt="LoliNya Network Logo"
                    class="logo-image"
                />
                <span class="text-subtitle-1 ml-2 text-medium-emphasis" v-if="!mobile"
                    >AS114514</span
                >
            </div>
        </v-app-bar-title>

        <!-- 在桌面端显示按钮 -->
        <template v-if="!mobile">
            <template v-for="(link, index) in navLinks" :key="index">
                <!-- 外部链接使用普通 href -->
                <v-btn
                    v-if="link.external"
                    :href="link.url"
                    target="_blank"
                    variant="text"
                    class="mx-1"
                >
                    <v-icon start>{{ link.icon }}</v-icon>
                    {{ link.title }}
                </v-btn>

                <!-- 内部路由使用 router-link -->
                <v-btn v-else :to="link.url" variant="text" class="mx-1">
                    <v-icon start>{{ link.icon }}</v-icon>
                    {{ link.title }}
                </v-btn>
            </template>

            <!-- 深色模式切换按钮 -->
            <v-btn
                icon
                @click="toggleTheme"
                class="ml-2"
                :aria-label="
                    isDark ? 'Switch to light color mode' : 'Switch to dark color mode'
                "
            >
                <v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
            </v-btn>
        </template>

        <!-- 在移动端显示菜单按钮 -->
        <template v-else>
            <!-- 深色模式切换按钮 (移动端) -->
            <v-btn
                icon
                @click="toggleTheme"
                class="mr-2"
                :aria-label="
                    isDark ? 'Switch to light color mode' : 'Switch to dark color mode'
                "
            >
                <v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
            </v-btn>

            <v-menu>
                <template v-slot:activator="{ props }">
                    <v-btn icon v-bind="props">
                        <v-icon>mdi-menu</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <template v-for="(link, index) in navLinks" :key="index">
                        <!-- 外部链接 -->
                        <v-list-item
                            v-if="link.external"
                            :href="link.url"
                            target="_blank"
                        >
                            <template v-slot:prepend>
                                <v-icon>{{ link.icon }}</v-icon>
                            </template>
                            <v-list-item-title>{{ link.title }}</v-list-item-title>
                        </v-list-item>

                        <!-- 内部路由链接 -->
                        <v-list-item v-else :to="link.url">
                            <template v-slot:prepend>
                                <v-icon>{{ link.icon }}</v-icon>
                            </template>
                            <v-list-item-title>{{ link.title }}</v-list-item-title>
                        </v-list-item>
                    </template>
                </v-list>
            </v-menu>
        </template>
    </v-app-bar>
</template>

<style scoped>
.gradient-header {
    background: linear-gradient(to right, rgb(var(--v-theme-primary), 0.05), transparent);
    border-bottom: 1px solid rgb(var(--v-theme-primary), 0.1);
}

.app-bar-with-border {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1); /* 浅灰色边框 */
}

:deep(.v-theme--dark) .app-bar-with-border {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.app-bar-blur {
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    background-color: rgba(var(--v-theme-background), 0.8) !important;
}

:deep(.v-theme--dark) .app-bar-blur {
    background-color: rgba(18, 18, 18, 0.8) !important;
}

.logo-image {
    height: auto;
    object-fit: contain;
}
</style>
