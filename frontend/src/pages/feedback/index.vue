<template>
    <div class="feedback flex flex-col bg-slate-50">
        <div class="flex items-center justify-between pt-2.5 pl-4 pb-3.5 pr-10 border-b border-slate-200">
            <img
                class="w-12 h-12 sm:w-[70px] sm:h-[70px]"
                src="/images/feedback-logo.png"
                alt="feedback-logo"
                width="70"
                height="70"
                loading="lazy"
            />
            <div>
                <btn @click="onAllFeedbackClick">All feedback</btn>
                <btn class="ml-5" variant="secondary" @click="onNewFeedbackClick">New feedback</btn>
            </div>
        </div>
        <section v-if="selectedSection == 'all-feedback'" class="flex flex-grow relative">
            <div class="absolute h-full w-full">
                <feedback-list
                    class="w-[414px] h-full"
                    :items="feedbacks"
                    :totalPages="totalPages"
                    v-model:filter="filter"
                    v-model:sort="sort"
                    v-model:selected="selectedFeedback"
                    v-model:currentPage="currentPage"
                />
            </div>
            <div class="flex flex-grow bg-white pt-[75px] ml-[414px]">
                <feedback-content
                    class="mx-auto min-w-[716px]"
                    v-if="selectedFeedback"
                    :type="selectedFeedback.feedbackType"
                    :title="selectedFeedback.title"
                    :name="selectedFeedback.name"
                    :email="selectedFeedback.email"
                    :timestamp="selectedFeedback.createdAt"
                    :message="selectedFeedback.message"
                />
            </div>
        </section>
        <section v-else-if="selectedSection == 'new-feedback'">
            <card class="mt-16 mx-auto max-w-[773px]" :title="'Add new feedback'">
                <form-new-feedback @send="onSendFeedback" />
            </card>
        </section>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import type { Feedback, FeedbackCreatePayload } from "@shared/types/feedback";

export default defineComponent({
    name: "feedback",
    data() {
        return {
            filter: "",
            sort: "",
            feedbacks: [],
            totalPages: 0,
            currentPage: 1,
            selectedSection: "all-feedback",
            selectedFeedback: null as null | Feedback
        };
    },
    watch: {
        async filter() {
            await this.loadFeedbackData();
        },
        async sort() {
            await this.loadFeedbackData();
        },
        async currentPage() {
            await this.loadFeedbackData();
        }
    },
    async mounted() {
        await this.loadFeedbackData();
    },
    methods: {
        async fetchFeedbacks(page = 1, { filter = "", sort = "" } = {}) {
            let url = `/api/feedback?page=${page}`;

            let query = "";
            if (filter) query += `&type=${filter}`;
            if (sort) query += `&sort=${sort}`;
            if (query) url += query;

            const response = await fetch(url);
            const data = await response.json();
            return data;
        },
        async createFeedback(data: FeedbackCreatePayload) {
            const response = await fetch("/api/feedback", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            await response.json();

            alert("Feedback sent");
        },
        async loadFeedbackData() {
            const data = await this.fetchFeedbacks(this.currentPage, { filter: this.filter, sort: this.sort });
            this.feedbacks = data.entries;
            this.totalPages = data.totalPages;
            this.currentPage = data.currentPage;
        },
        onAllFeedbackClick() {
            this.selectedSection = "all-feedback";
        },
        onNewFeedbackClick() {
            this.selectedSection = "new-feedback";
        },
        async onSendFeedback(data: FeedbackCreatePayload) {
            await this.createFeedback(data);
            await this.loadFeedbackData();
            this.selectedSection = "all-feedback";
        }
    }
});
</script>
