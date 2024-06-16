<template>
    <div class="pagination flex items-center">
        <btn variant="secondary" class="w-14">{{ "<" }}</btn>
        <btn v-for="num in total" :key="num" :variant="btnVariant(num)" class="border border-gray-200 w-14">
            {{ num }}
        </btn>
        <btn variant="secondary" class="w-14">{{ ">" }}</btn>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "pagination",
    props: {
        selected: Number,
        total: Number
    },
    methods: {
        btnVariant(num: number) {
            return num === this.selected ? "primary" : "secondary";
        }
    }
});
</script>
