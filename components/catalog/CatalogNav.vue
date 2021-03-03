<template>
    <nav :class="$style.nav">
        <ul>
            <nuxt-link v-for="category in categories"
                       v-slot="{ href, navigate, isActive}"
                       :key="category.name"
                       :to="`/${category.id}`"
                       custom
            >
                <li :class="[$style.categoryitem, 'p1', {[$style._active]: isActive || category.id === currentCategory}]">
                    <a :href="href" @click="navigate">{{ category.name }}</a>
                </li>
            </nuxt-link>
        </ul>
    </nav>
</template>

<script>
    export default {
        props: {
            categories: {
                type: Array
            },
            currentCategory: {
                type: Number
            }
        }
    }
</script>

<style lang="scss" module>
    .nav {
        width: 146px;
        padding-right: 15px;
        flex-shrink: 0;
    }


    .categoryitem {
        margin-bottom: 16px;
        color: $grey-light;
        transition: color .2s ease;

        &:hover {
            color: $grey;
        }

        &:last-child {
            margin-bottom: 0;
        }

        &._active {
            color: $black;
            text-decoration: underline;

            &:hover {
                color: $black;
            }
        }
    }
</style>
