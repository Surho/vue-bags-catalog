<template>
    <div :class="[$style.cart, {[$style._withHover]: hover}]"
         @click="onClick"
    >
        <svg :class="[$style.cartIcon, {[$style._small]: !headerIcon}]" xmlns="http://www.w3.org/2000/svg">
            <use href="#icon-cart"/>
        </svg>

        <div v-if="cartNumber" :class="[$style.cartNumber, 'extraSmall']">
            {{ cartNumber }}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'IconCart',
        props: {
            cartNumber: {
               type: Number
            },
            hover: {
                type: Boolean
            },
            headerIcon: {
                type: Boolean
            }
        },
        methods: {
            onClick() {
                this.headerIcon
                    ? this.$emit('open-cart')
                    : this.$emit('add-to-cart')
            }
        }
    }
</script>

<style lang="scss" module>
    .cart {
        cursor: pointer;
    }

    .cartIcon {
        display: block;
        width: 32px;
        height: 32px;
    }

    .cartIcon._small {
        width: 16px;
        height: 16px;
    }

    .cart._withHover {
        opacity: .4;
        transition: all .3s ease;

        &:hover {
            opacity: 1;
        }
    }

    .cartNumber {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        right: 0;
        width: 12px;
        height: 12px;
        color: white;
        background-color: $grey-light;
        border-radius: 50%;
    }
</style>
