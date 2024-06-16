<template>
    <router-view v-slot="{ Component }">
        <component id="page" :is="Component" />
    </router-view>
</template>

<script lang="ts">
export default {
    name: "App"
};
</script>
