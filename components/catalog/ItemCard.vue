<template>
    <div :class="$style.card">
        <div :class="$style.rating">
            <Icon-star :rating="item.rating"/>
            <p :class="[ $style.ratingValue, 'caption']">{{ item.rating }}</p>
        </div>
        <Icon-cart :hover="true"
                   :class="$style.cart"
                   :header-icon="false"
                   @add-to-cart="addToCart"
        />
        <div :class="$style.image"
             :style="{ backgroundImage: `url('${imgUrl}')` }"
        >
            Фото товара
        </div>
        <div :class="$style.description">
            <p :class="[$style.title, 'p2']">{{ item.name }}</p>
            <p :class="[$style.price, 'p2']">{{ priceFormatted }} ₽</p>
        </div>
    </div>
</template>

<script>
    import {splitThousands} from '../../assets/js/utils'
    import IconCart from '../ui/icons/IconCart'
    import IconStar from '../ui/icons/IconStar'
    import { mapState } from 'vuex'

    export default {
        components: {
            IconCart,
            IconStar
        },
        props: {
            item: {
                type: Object
            }
        },
        computed: {
            ...mapState({
                cart: state => state.cart.cart
            }),

            baseUrl() {
                return this.$store.state.baseUrl
            },
            imgUrl() {
                return this.baseUrl + this.item.photo
            },
            priceFormatted() {
                return splitThousands(this.item.price)
            }
        },
        methods: {
            addToCart() {
                this.$store.dispatch('cart/addToCart', this.item)
            },
        }
    }
</script>

<style lang="scss" module>
    .title {
        color: $grey;
        -webkit-font-smoothing: antialiased;
    }

    .price {
        color: $black;
        font-weight: bold;
        -webkit-font-smoothing: antialiased;
    }

    .card {
        position: relative;
        box-sizing: border-box;
        width: 264px;
        padding: 18px 16px 16px 16px;
        margin: 0 8px;
        margin-bottom: 16px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, .05);
        border-radius: 8px;
        background-color: white;
        cursor: pointer;
        transition: all .3s ease;

        &:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 16px rgba(0, 0, 0, .1)
        }
    }

    .image {
        width: 100%;
        height: 180px;
        font-size: 0;
        color: transparent;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;
    }

    .cart {
        position: absolute;
        z-index: 1;
        width: 16px;
        height: 16px;
        right: 16px;
        top: 16px;
    }

    .ratingValue {
        color: $yellow;
    }

    .rating {
        position: absolute;
        top: 17px;
        left: 16px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 30px;
    }
</style>
