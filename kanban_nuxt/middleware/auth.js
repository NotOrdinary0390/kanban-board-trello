
export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.client) {

        if (!localStorage.getItem('sessionToken')) {
            return navigateTo("/")
        } else {
            if (to.path !== "/board") {
                return navigateTo("/board")
            }
        }
    }
});
