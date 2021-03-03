<template>
    <div :class="$style.pageWrap">
        <Site-header />

        <Nuxt />

        <svg-sprite />
    </div>
</template>

<script>
    import SiteHeader from '../components/common/SiteHeader'
    import svgSprite from '../components/common/svg-sprite'


    export default {
        components: {
            SiteHeader,
            svgSprite,
        },
    }
</script>

<style lang="scss" module>
    .main {
        background-color: #fff;
    }
</style>
