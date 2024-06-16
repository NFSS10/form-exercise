<template>
    <div class="card shadow-md border border-slate-200 border-solid rounded-md bg-white">
        <div class="border-b border-slate-200 text-2xl font-medium pt-[17px] pb-[21px] px-[35px]" v-if="title">
            {{ title }}
        </div>
        <div class="pt-8 pb-7 px-10">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "card",
    props: {
        title: String
    }
});
</script>
