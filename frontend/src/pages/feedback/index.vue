<template>
    <div class="feedback">
        <div class="w-96">
            <feedback-item type="bug" title="Feedback title" name="John Doe" :timestamp="Date.now() - 1000 * 60 * 30" />
            <feedback-item type="bug" title="Feedback title" name="John Doe" :timestamp="Date.now()" state="selected" />
        </div>
        <hr />
        <btn>My button</btn>
        <div class="w-96">
            <pagination :selected="3" :total="10" />
        </div>
        <div class="w-96">
            <pagination :selected="1" :total="10" />
        </div>
        <div class="w-96">
            <pagination :selected="10" :total="10" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "feedback"
});
</script>
