<template>
    <button :class="variantClasses">
        <slot />
    </button>
</template>

<style scoped></style>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import type { BtnVariant } from "./types";

const colorStyles = {
    primary: "bg-emerald-400 text-white",
    secondary: "bg-slate-100"
};

const hoverStyles = {
    primary: "hover:bg-emerald-500",
    secondary: "hover:bg-slate-200"
};

const activeStyles = {
    primary: "active:bg-emerald-600",
    secondary: "active:bg-slate-300"
};

export default defineComponent({
    name: "btn",
    props: {
        variant: {
            type: String as PropType<BtnVariant>,
            default: "primary"
        }
    },
    computed: {
        variantClasses() {
            const base = "btn w-auto box-border cursor-pointer text-sm font-bold py-2 px-4 rounded-sm";
            const transition = "transition-colors duration-100 ease-out";
            const color = colorStyles[this.variant];
            const hover = hoverStyles[this.variant];
            const active = activeStyles[this.variant];
            return [base, transition, color, hover, active].join(" ");
        }
    }
});
</script>
