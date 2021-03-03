<template>
    <div :class="$style.close"
         @click="close"
    >
        Закрыть
    </div>
</template>

<script>
    export default {
        name: 'IconClose',
        methods: {
            close() {
                this.$emit('close')
            }
        }
    }
</script>

<style lang="scss" module>

    .close {
        position: absolute;
        width: 20px;
        height: 20px;
        font-size: 0;
        color: transparent;
        cursor: pointer;
        transition: transform .2s ease;

        &:hover {
            transform: rotate(90deg);
        }

        &:before,
        &:after {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 2px;
            background-color: $black;
        }

        &:before {
            transform: translate(-50%, -50%) rotate(45deg);
        }

        &:after {
            transform: translate(-50%, -50%) rotate(-45deg);
        }
    }
</style>
