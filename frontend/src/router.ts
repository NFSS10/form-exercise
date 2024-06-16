import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "Feedback",
        component: () => import("./pages/feedback/index.vue")
    },
    {
        path: "/:catchAll(.*)",
        name: "NotFound",
        component: () => import("./pages/not-found/index.vue")
    }
];

const router = createRouter({
    history: createWebHistory("/"),
    routes: routes
});

export default router;
