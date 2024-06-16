<template>
    <div class="feedback-content">
        <div>{{ postedAt }}</div>
        <div class="flex">
            <icon :icon="icon" />
            <div>
                <div class="flex items-center font-medium text-base">{{ title }}</div>
                <div class="flex justify-between text-xs mt-1.5 text-slate-500">
                    <div>{{ name }}</div>
                    <div>{{ email }}</div>
                </div>
                <div class="whitespace-pre-line">{{ message }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import type { FeedbackType } from "@shared/types/feedback";
import { feedbackInfoMixin } from "@/mixins/feedback-info";

export default defineComponent({
    name: "feedback-content",
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
        email: {
            type: String,
            required: true
        },
        timestamp: {
            type: Number,
            required: true
        },
        message: {
            type: String,
            default: "Hi Team,\n hello and stuff"
        }
    },
    computed: {
        icon() {
            return this.feedbackIcon(this.type);
        },
        postedAt() {
            return this.postedAtText(this.timestamp);
        }
    }
});
</script>
