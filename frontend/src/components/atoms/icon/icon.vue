<template>
    <div class="icon" ref="icon" v-html="svgFile" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

const modules = import.meta.glob("./assets/**/*.svg", { query: "?raw", import: "default", eager: true });

export default defineComponent({
    name: "icon",
    props: {
        icon: String
    },
    computed: {
        svgFile() {
            const resource = modules[`./assets/${this.icon}.svg`];
            return resource;
        }
    },
    watch: {
        $attrs: {
            handler(value) {
                this.setIconAttributes(value);
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        setIconAttributes(attrs: Object) {
            this.$nextTick(() => {
                const iconElement: any = this.$refs.icon;
                if (!iconElement) {
                    this.setIconAttributes(attrs);
                    return;
                }

                const svgElement: HTMLElement = iconElement.firstChild;

                const attributes = [
                    "height",
                    "width",
                    "viewBox",
                    "x",
                    "y",
                    "clip-path",
                    "clip-rule",
                    "color",
                    "color-interpolation",
                    "color-rendering",
                    "cursor",
                    "display",
                    "fill",
                    "fill-opacity",
                    "fill-rule",
                    "filter",
                    "mask",
                    "opacity",
                    "pointer-events",
                    "shape-rendering",
                    "stroke",
                    "stroke-dasharray",
                    "stroke-dashoffset",
                    "stroke-linecap",
                    "stroke-linejoin",
                    "stroke-miterlimit",
                    "stroke-opacity",
                    "stroke-width",
                    "transform",
                    "vector-effect"
                ];
                attributes.forEach(attribute => {
                    // @ts-ignore
                    const value: string = attrs[attribute as keyof Object];
                    if (value !== undefined) svgElement.setAttribute(attribute, value);
                });
            });
        }
    }
});
</script>
