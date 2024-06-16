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
            <div class="absolute h-full w-full;">
                <feedback-list
                    class="w-[414px] h-full overflow-auto"
                    :items="feedbacks"
                    :currentPage="currentPage"
                    :totalPages="totalPages"
                    v-model:selected="selectedFeedback"
                />
            </div>
            <div class="flex flex-grow bg-white pt-[75px]">
                <feedback-content
                    class="mx-auto min-w-[716px]"
                    v-if="selectedFeedback"
                    :type="selectedFeedback.feedbackType"
                    :title="'TODFO selectedFeedback.title'"
                    :name="selectedFeedback.name"
                    :email="selectedFeedback.email"
                    :timestamp="selectedFeedback.createdAt"
                />
            </div>
        </section>
        <section v-else-if="selectedSection == 'new-feedback'">
            <form-new-feedback />
        </section>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import type { Feedback } from "@shared/types/feedback";

export default defineComponent({
    name: "feedback",
    data() {
        return {
            feedbacks: [],
            totalPages: 0,
            currentPage: 1,
            selectedSection: "all-feedback",
            selectedFeedback: null as null | Feedback
        };
    },
    watch: {
        selectedFeedback(value: Feedback) {
            console.log("changed", value.id);
        }
    },
    async mounted() {
        const data = await this.fetchFeedbacks();
        this.feedbacks = data.entries;
        this.totalPages = 2; // data.totalPages;
        this.currentPage = data.currentPage;
    },
    methods: {
        async fetchFeedbacks() {
            const response = await fetch("/api/feedback");
            const data = await response.json();
            console.log(data);
            return data;
        },
        onAllFeedbackClick() {
            this.selectedSection = "all-feedback";
        },
        onNewFeedbackClick() {
            this.selectedSection = "new-feedback";
        }
    }
});
</script>
