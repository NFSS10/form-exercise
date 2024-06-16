<template>
    <div class="feedback-list bg-slate-50 flex flex-col">
        <div class="flex items-center justify-between p-1 border border-slate-200 pt-3 px-4 pb-4">
            <div class="flex items-center">
                <label for="filter" class="mr-3 text-xs font-medium">Filter</label>
                <select id="filter" v-model="filterData">
                    <option value="">No filter</option>
                    <option v-for="value in typeValues" :key="value" :value="value">{{ capitalize(value) }}</option>
                </select>
            </div>
            <div class="flex items-center">
                <label for="sort" class="mr-3 text-xs font-medium">Sort</label>
                <select id="sort" v-model="sortData">
                    <option value="">Unsorted</option>
                    <option value="createdAt">Date</option>
                    <option value="name">Name</option>
                </select>
            </div>
        </div>
        <div class="flex flex-col justify-between flex-grow border border-slate-200">
            <div>
                <feedback-item
                    class="cursor-pointer select-none mb-2"
                    v-for="item in items"
                    :key="item.id"
                    :type="item.feedbackType"
                    :title="item.title"
                    :name="item.name"
                    :timestamp="item.createdAt"
                    :state="itemState(item)"
                    @click="selectedFeedback = item"
                />
            </div>
            <div class="flex items-center justify-center h-16 border-t border-b border-slate-200" v-if="totalPages > 1">
                <pagination :total="totalPages" :selected="currentPage" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import { feedbackTypeValues, type Feedback } from "@shared/types/feedback";

export default defineComponent({
    name: "feedback-list",
    props: {
        filter: {
            type: String,
            default: ""
        },
        sort: {
            type: String,
            default: ""
        },
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
        },
        typeValues: {
            type: Array as PropType<string[]>,
            default: feedbackTypeValues
        }
    },
    data() {
        return {
            filterData: this.filter,
            sortData: this.sort,
            selectedFeedback: this.selected as null | Feedback
        };
    },
    watch: {
        selected(value: Feedback) {
            this.selectedFeedback = value;
        },
        selectedFeedback(value: Feedback) {
            this.$emit("update:selected", value);
        },
        filter(value: string) {
            this.filterData = value;
        },
        filterData(value: string) {
            this.$emit("update:filter", value);
        },
        sort(value: string) {
            this.sortData = value;
        },
        sortData(value: string) {
            this.$emit("update:sort", value);
        }
    },
    methods: {
        itemState(item: Feedback) {
            if (!this.selectedFeedback) return "default";
            return this.selectedFeedback.id === item.id ? "selected" : "default";
        },
        capitalize(value: string) {
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
    }
});
</script>
