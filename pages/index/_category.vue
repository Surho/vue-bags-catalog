<template>
    <div :class="[$style.list, {[$style._isSorting]: isSorting}]">
        <div :class="$style.wrapper">
            <Item-card v-for="item in goods"
                       :key="item.id"
                       :item="item"
            />
        </div>
    </div>
</template>

<script>
    import ItemCard from '../../components/catalog/ItemCard'

    export default {
        components: {
            ItemCard
        },
       transition: {
            name: 'fade',
        },
        props: {
            goods: {
                type: Array
            },
            isSorting: {
                type: Boolean
            }
        },
    }
</script>

<style lang="scss" module>
    .wrapper {
        display: flex;
        flex-wrap: wrap;
        margin-right: -8px;
        margin-left: -8px
    }

    .list {
        transition: all .3s ease;
    }

    .list._isSorting {
        opacity: 0;
    }
</style>

