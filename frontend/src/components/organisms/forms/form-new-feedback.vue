<template>
    <div class="form-new-feedback">
        <div class="flex flex-col">
            <label for="name" class="text-base font-medium">Name</label>
            <input
                id="name"
                class="border border-slate-200 rounded-sm h-9 mt-2 max-w-[300px]"
                v-model="name"
                type="text"
            />

            <label for="email" class="text-base font-medium mt-7">Email</label>
            <input
                id="email"
                class="border border-slate-200 rounded-sm h-9 mt-2 max-w-[300px]"
                v-model="email"
                type="email"
            />

            <label for="type" class="text-base font-medium mt-7">Type</label>
            <select id="type" v-model="type" class="bg-white border border-slate-200 rounded-sm h-9 mt-2">
                <option disabled value="">Select type</option>
                <option v-for="value in typeValues" :key="value" :value="value">{{ capitalize(value) }}</option>
            </select>

            <label for="title" class="text-base font-medium mt-7">Title</label>
            <input id="title" class="border border-slate-200 rounded-sm h-9 mt-2" v-model="title" type="text" />

            <label for="message" class="text-base font-medium mt-7">Message</label>
            <textarea id="message" class="border border-slate-200 rounded-sm h-9 mt-2 min-h-[166px]" v-model="message">
            </textarea>
            <div class="mt-7 ml-auto">
                <btn variant="secondary" @click="onDiscardClick">Discard</btn>
                <btn class="ml-5" @click="onSendClick">Send feedback</btn>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import { feedbackTypeValues, type FeedbackCreatePayload, type FeedbackType } from "@shared/types/feedback";

export default defineComponent({
    name: "form-new-feedback",
    props: {
        typeValues: {
            type: Array as PropType<string[]>,
            default: feedbackTypeValues
        }
    },
    data() {
        return {
            name: "",
            email: "",
            type: "",
            title: "",
            message: ""
        };
    },
    computed: {
        isFilled() {
            return this.name && this.email && this.type && this.title && this.message;
        }
    },
    methods: {
        validate(): boolean {
            // This is just a simple client side validation example
            // in a production environment this should be much more refined
            if (!this.name) {
                alert("Name must be filled");
                return false;
            }
            if (!this.email) {
                alert("Email must be filled");
                return false;
            }
            if (!this.type) {
                alert("Type must be filled");
                return false;
            }
            if (!this.title) {
                alert("Title must be filled");
                return false;
            }
            if (!this.message) {
                alert("Message must be filled");
                return false;
            }

            return true;
        },
        capitalize(value: string) {
            return value.charAt(0).toUpperCase() + value.slice(1);
        },
        onDiscardClick() {
            this.name = "";
            this.email = "";
            this.type = "";
            this.title = "";
            this.message = "";
        },
        onSendClick() {
            if (!this.validate()) return;

            const data: FeedbackCreatePayload = {
                name: this.name,
                email: this.email,
                feedbackType: this.type as FeedbackType,
                title: this.title,
                message: this.message
            };
            this.$emit("send", data);
        }
    }
});
</script>
