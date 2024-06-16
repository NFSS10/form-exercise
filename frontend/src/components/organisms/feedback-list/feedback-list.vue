<template>
    <div class="feedback-list bg-slate-50 flex flex-col">
        <div>TODO filter</div>
        <div class="flex flex-col justify-between flex-grow">
            <div>
                <feedback-item
                    v-for="item in items"
                    :key="item.id"
                    :type="item.feedbackType"
                    :title="'TODO title'"
                    :name="item.name"
                    :timestamp="item.createdAt"
                    :state="itemState(item)"
                />
            </div>
            <div class="flex items-center justify-center" v-if="totalPages > 1">
                <pagination :total="totalPages" :selected="currentPage" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import type { Feedback } from "@shared/types/feedback";

export default defineComponent({
    name: "feedback-list",
    props: {
        items: {
            type: Array as PropType<Feedback[]>,
            default: () => []
        },
        selected: {
            type: Object as PropType<Feedback>,
            default: null
        },
        totalPages: {
            type: Number,
            default: 0
        },
        currentPage: {
            type: Number,
            default: 1
        }
    },
    methods: {
        itemState(item: Feedback) {
            if (!this.selected) return "default";
            return this.selected.id === item.id ? "selected" : "default";
        }
    }
});
</script>
