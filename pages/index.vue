<template>
    <div :class="[$style.main, 'container']">
        <div :class="$style.goodsHead">
            <h1 :class="[$style.title, 'title']">Каталог</h1>
            <Catalog-sort
                :sort-params="sortParams"
                :active-sort-param="activeSortParam"
                @sort="onSort"
            />
        </div>

        <div :class="$style.goodsContainer">
            <Catalog-nav
                :categories="categories"
                :current-category="currentCategory"
            />

            <NuxtChild
                :key="$route.params.category"
                :class="$style.goods"
                :goods="sortedGoods"
                :is-sorting="isSorting"
                keep-alive
            />
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import CatalogNav from '../components/catalog/CatalogNav'
    import CatalogSort from '../components/catalog/CatalogSort'

    export default {
        components: {
            CatalogNav,
            CatalogSort
        },
        data () {
            return {
                currentCategory: 0,
                isSorting: false,
                sortParams: [
                    {
                        title: 'цене',
                        name: 'price',
                        ordering: 'desc'
                    },
                    {
                        title: 'популярности',
                        name: 'rating',
                        ordering: 'desc'
                    }
                ],
                activeSortParam: {
                    title: 'цене',
                    name: 'price',
                    ordering: 'desc'
                }
            }
        },
        async fetch () {
            let firstCategory = this.$store.getters.firstCategoryId,
                currentCategory = this.$route.params.category
                    ? Number(this.$route.params.category)
                    : Number(firstCategory)
            this.currentCategory = currentCategory

            await this.$store.dispatch('fetchGoods', currentCategory)
        },
        computed: {
            ...mapState(['categories']),
            goods() {
                return this.$store.getters.goodsByCategory(this.currentCategory)
            },
            compareFunc() {
                let sortParamName = this.activeSortParam.name
                return this.activeSortParam.ordering === 'asc'
                        ? (a, b) => a[sortParamName] - b[sortParamName]
                        : (a, b) => b[sortParamName] - a[sortParamName]
            },
            sortedGoods() {
                return Object.assign([], this.goods).sort(this.compareFunc)
            }
        },
        watch: {
            '$route.params': function () {
                this.$fetch()
            },
        },
        methods: {
            async onSort($event) {
                await this.changeSortState()
                let index
                this.sortParams.find((item, i) => {
                    if(item.name === $event.name) {
                        index = i
                        return true
                    }
                })
                this.sortParams[index].name = $event.name
                if(this.activeSortParam.name === $event.name) this.sortParams[index].ordering = $event.ordering
                this.activeSortParam = this.sortParams[index]
                await this.changeSortState()
            },
            async changeSortState() {
                await new Promise((resolve) => {
                    this.isSorting = !this.isSorting
                    setTimeout(() => {
                        resolve()
                    }, 300)
                })
            }
        }
    }
</script>

<style lang="scss" module>

    .main {
        padding-top: calc(#{$headerHeight} + 32px);
        color: black;
    }

    .goods {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
    }

    .goodsHead {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
    }

    .goodsContainer {
        display: flex;
        justify-content: space-between;
    }
</style>
