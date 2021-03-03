<template>
    <button
        :class="$style.button"
        :type="type"
        @click="onClick"
    >
        <slot class="p1"></slot>
    </button>
</template>

<script>
    export default {
        props: {
            type: {
                type: String,
                required: true
            },
        },
        methods: {
            onClick($event) {
                if(this.type === 'submit') {
                    this.$emit('submit', $event)
                } else {
                    this.$emit('click')
                }
            }
        }
    }
</script>

<style lang="scss" module>
    .button {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 14px 14px 15px 14px;
        background-color: $black;
        border: none;
        border-radius: 8px;
        color: white;
        cursor: pointer;
        transition: all .3s ease;

        &:hover {
            background-color: $grey;
        }
    }
</style>
