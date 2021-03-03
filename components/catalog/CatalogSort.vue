<template>
    <div :class="$style.sortContainer">
        <div :class="$style.sortTitle"
             @click="toggle"
        >
            <p :class="'p1'">
                Сортировать по:
                <span :class="[{
                    [$style._asc]: currentSort.ordering === 'asc',
                    [$style._desc]:currentSort.ordering === 'desc'
                 }]">
                {{ currentSort.title }}
            </span>
            </p>
        </div>
        <div :class="[$style.sortDropdown, {[$style._opened]: opened, [$style._reverseTransition]: isClosing}]">
            <ul :class="$style.list">
                <li v-for="param in sortParams"
                    :key="param.name"
                    :class="[$style.item, 'p2']"
                    @click="onOptionClick(param.name)"
                >
                    По {{ param.title }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            sortParams: {
                type: Array
            },
            activeSortParam: {
                type: [Object, null]
            }
        },
        data() {
            return {
                opened: false,
                isClosing: false,
            }
        },
        computed: {
            currentSort() {
                return this.activeSortParam
                    ? this.activeSortParam
                    : this.sortParams[0]
            }
        },
        methods: {
            toggle() {
                if (this.opened)  this.onClose()
                this.opened = !this.opened

                this.opened
                    ? window.addEventListener('click', this.onSpareSpaceClick)
                    : window.removeEventListener('click', this.onSpareSpaceClick)
            },
            onSpareSpaceClick(event) {
                if(!event.target.closest(`.${this.$style.sortContainer}`)) {
                    this.onClose()
                    this.opened = false
                    window.removeEventListener('click', this.onSpareSpaceClick)
                }
            },
            onClose () {
                this.isClosing = true

                setTimeout(() => {
                    this.isClosing = false
                }, 350)
            },
            onOptionClick(name) {
                let ordering = this.currentSort.ordering === 'asc' ? 'desc' : 'asc'
                this.$emit('sort', {
                    name,
                    ordering
                })
            }
        }
    }
</script>

<style lang="scss" module>
    .sortContainer {
        position: relative;
        display: flex;
        justify-content: flex-end;
        transition: all .3s ease;
    }

    .sortTitle {
        padding: 10px 0;
        cursor: pointer;

        span {
            position: relative;
            margin-left: 6px;
            padding-right: 9px;
            color: $grey;

            &:after {
                content: "";
                position: absolute;
                width: 0;
                height: 0;
                top: 50%;
                right: 0;
                border-style: solid;
                border-width: 3px 3px 0 3px;
                border-color: $grey transparent transparent transparent;
                transition: transform .2s ease;
            }

            &._asc {

                &:after {
                    transform: rotate(180deg);
                }
            }

            &._desc {

                &:after {
                    transform: rotate(0);
                }
            }
        }
    }

    .sortDropdown {
        box-sizing: border-box;
        position: absolute;
        z-index: 10;
        padding: 12px 0;
        left: 0;
        top: calc(100% - 4px);
        width: 100%;
        background-color: white;
        border-radius: 0 0 8px 8px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, .05);
        transform: scaleY(0);
        transition: transform .2s ease;
        transform-origin: 0 50%;

        & > * {
            opacity: 0;
            transition: opacity .2s ease .2s;
        }

        &._reverseTransition {
            transition: transform .2s ease .2s;

            & > * {
                transition: opacity .2s ease;
            }
        }

        &._opened {
            transform: scaleY(1);

            & > * {
                opacity: 1;
            }
        }
    }

    .item {
        padding: 4px 12px;
        color: $grey-light;
        background-color: white;
        transition: background-color .2s ease;
        cursor: pointer;

        &:hover {
            color: $black;
            background-color: $grey-extra-light;
        }
    }
</style>
