<template>
    <div class="pagination flex items-center">
        <btn variant="secondary" class="w-14">{{ "<" }}</btn>
        <btn v-for="num in pagesButtons" :key="num" :variant="btnVariant(num)" class="border border-gray-200 w-14">
            {{ num === -1 ? "..." : num }}
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
    data() {
        return {
            parentWidth: 0
        };
    },
    computed: {
        pagesButtons(): number[] {
            if (!this.total) return [];
            if (!this.selected) return [];

            const nums: number[] = [];

            // this is just a quick implementation just to have the pagination behave like in
            // the design. It works but I wouldn't do this in a production environment 😅
            const width = 50;
            let spacesAvailable = Math.floor(this.parentWidth / width);
            spacesAvailable -= 2; // spaces occupied by the left and right buttons

            // if everything fits
            if (spacesAvailable >= this.total) return Array.from({ length: this.total }, (_, i) => i + 1);

            // there isn't enough space for the middle buttons so just show the < and > buttons
            if (spacesAvailable < 3) return nums;

            // we want to have an odd number of spaces available so it's nice and centered
            if (spacesAvailable % 2 === 0) spacesAvailable -= 1;

            const middle = Math.ceil(spacesAvailable / 2);

            for (let i = 1; i < middle; i++) nums.push(i);

            // pushes the middle value, which means the selected value if it's in the middle or -1 which is treated as "..."
            const middleNum = this.selected >= middle && this.selected <= this.total - middle ? this.selected : -1;
            nums.push(middleNum);

            for (let i = this.total - middle + 2; i <= this.total; i++) nums.push(i);

            return nums;
        }
    },
    mounted() {
        this.parentWidth = this.$el.offsetWidth;
    },
    methods: {
        btnVariant(num: number) {
            return num === this.selected ? "primary" : "secondary";
        }
    }
});
</script>
