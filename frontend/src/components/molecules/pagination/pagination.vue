<template>
    <div class="pagination flex items-center">
        <btn variant="secondary" class="w-14" @click="onPrevClick">{{ "<" }}</btn>
        <btn
            class="border border-gray-200 w-14"
            v-for="num in total"
            :key="num"
            :variant="btnVariant(num)"
            @click="() => onNumClick(num)"
        >
            {{ num }}
        </btn>
        <btn variant="secondary" class="w-14" @click="onNextClick">{{ ">" }}</btn>
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
    data() {
        return {
            selectedData: this.selected
        };
    },
    watch: {
        selected(value: number) {
            this.selectedData = value;
        },
        selectedData(value: number) {
            this.$emit("update:selected", value);
        }
    },
    methods: {
        btnVariant(num: number) {
            return num === this.selected ? "primary" : "secondary";
        },
        onNumClick(num: number) {
            this.selectedData = num;
        },
        onPrevClick() {
            if (!this.selectedData) return;
            if (this.selectedData > 1) this.selectedData--;
        },
        onNextClick() {
            if (!this.selectedData || !this.total) return;
            if (this.selectedData < this.total) this.selectedData++;
        }
    }
});
</script>
