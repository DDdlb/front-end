import { createRouter, createWebHistory } from "vue-router";
import { isMobile } from "@/utils/flexible";
import mobileRouter from "./modules/mobile-router";
import pcRouter from "./modules/pc-router";

const router = createRouter({
    history: createWebHistory(),
    routes: isMobile.value? mobileRouter : pcRouter
})

export default router