<template>
    <div class="feedback">
        <div class="flex items-center justify-between pt-2.5 pl-4 pb-3.5 pr-10 border-b border-slate-200 bg-slate-50">
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
        <section v-if="sectionSelected == 'all-feedback'">
            <feedback-list />
            <feedback-content />
        </section>
        <section v-else-if="sectionSelected == 'new-feedback'">
            <form-new-feedback />
        </section>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "feedback",
    data() {
        return {
            sectionSelected: "all-feedback"
        };
    },
    methods: {
        onAllFeedbackClick() {
            this.sectionSelected = "all-feedback";
        },
        onNewFeedbackClick() {
            this.sectionSelected = "new-feedback";
        }
    }
});
</script>
