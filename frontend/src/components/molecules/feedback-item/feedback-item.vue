<template>
    <div class="feedback-item flex pt-2 pb-3 pr-3 pl-2 rounded-md" :class="classes">
        <icon :icon="icon" />
        <div class="flex-grow ml-2">
            <div class="flex items-center font-medium text-base">{{ title }}</div>
            <div class="flex justify-between text-xs mt-1.5 text-slate-500">
                <div>{{ name }}</div>
                <div>{{ postedAt }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import type { FeedbackType } from "@shared/types/feedback";
import { feedbackInfoMixin } from "@/mixins/feedback-info";
import type { FeedbackItemState } from "./types";

export default defineComponent({
    name: "feedback-item",
    mixins: [feedbackInfoMixin],
    props: {
        type: {
            type: String as PropType<FeedbackType>,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        timestamp: {
            type: Number,
            required: true
        },
        state: {
            type: String as PropType<FeedbackItemState>,
            default: "default"
        }
    },
    computed: {
        classes() {
            return {
                "bg-slate-100": this.state === "selected"
            };
        },
        icon() {
            return this.feedbackIcon(this.type);
        },
        postedAt() {
            return this.postedAtText(this.timestamp);
        }
    }
});
</script>
