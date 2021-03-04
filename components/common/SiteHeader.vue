<template>
    <div :class="$style.header">
        <div :class="[$style.headerWrap, 'container']">
            <Logo/>
            <Icon-cart
                id="headerCartIcon"
                :class="$style.cart"
                :header-icon="true"
                :cart-number="cartQuantity"
                @open-cart="openCart"
            />
        </div>

        <Cart
            :opened="cartOpened"
            :items="cart"
            @close="closeCart"
        />
    </div>
</template>

<script>
    import { mapGetters, mapState } from 'vuex'

    import Logo from './Logo'
    import IconCart from '../ui/icons/IconCart'
    import Cart from '../common/Cart'

    export default {
        components: {
            Logo,
            IconCart,
            Cart
        },
        data() {
            return {
                cartOpened: false
            }
        },
        computed: {
            ...mapState({
                cart: state => state.cart.cart
            }),
            ...mapGetters('cart', ['cartQuantity'])
        },
        methods: {
            openCart() {
                this.cartOpened = true
            },
            closeCart() {
                this.cartOpened = false
            }
        }
    }
</script>

<style lang="scss" module>
    .header {
        position: fixed;
        z-index: 10;
        width: 100%;
        height: $headerHeight;
        top: 0;
        left: 0;
        box-shadow: 0 4px 16px rgba(0, 0, 0, .05);
        background-color: white;

        .headerWrap {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 100%;
        }
    }

    .cart {
        position: relative;
    }
</style>
