<template>
    <div :class="$style.cartItem">
        <div :class="$style.image"
             :style="{ backgroundImage: `url('${imgUrl}')` }"
        >
            Фото товара
        </div>

        <div :class="$style.info">
            <p :class="[$style.name, 'p2']">{{ cartItem.name }} <span>({{ item.count }})</span></p>
            <p :class="[$style.price, 'strong2']">{{ priceFormatted }} ₽</p>
            <div :class="$style.rating">
                <Icon-star :rating="cartItem.rating"/>
                <p :class="[ $style.ratingValue, 'caption']">{{ cartItem.rating }}</p>
            </div>
        </div>

        <div :class="$style.iconContainer"
             @click="removeItem"
        >
            <svg :class="$style.iconTrash" xmlns="http://www.w3.org/2000/svg">
                <use href="#icon-trash"/>
            </svg>
        </div>
    </div>
</template>

<script>
    import { splitThousands } from '../../assets/js/utils'
    import IconStar from '../ui/icons/IconStar'

    export default {
        components: {
            IconStar
        },
        props: {
           item: {
               type: Object,
               required: true
           }
        },
        computed: {
            cartItem() {
                return this.item.obj
            },
            baseUrl() {
                return this.$store.state.baseUrl
            },
            imgUrl() {
                return this.baseUrl + this.cartItem.photo
            },
            priceFormatted() {
                return splitThousands(this.cartItem.price)
            },
        },
        methods: {
            removeItem() {
                this.$emit('remove-item', this.item.id)
            }
        }
    }
</script>

<style lang="scss" module>

    .cartItem {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 15px 20px 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, .05);
    }

    .name {
        margin-bottom: 6px;
        color: $grey;
    }

    .price {
        margin-bottom: 16px;
        color: $black;
    }

    .image {
        width: 70px;
        height: 90px;
        margin-right: 34px;
        background-size: contain;
        background-repeat: no-repeat;
        font-size: 0;
        color: transparent;
    }

    .info {
        width: 170px;
        margin-right: 16px;

        @include respond-to(mobile) {
            margin-right: auto;
        }
    }

    .iconTrash {
        width: 32px;
        height: 32px;

        svg {
            width: 32px;
            height: 32px;
        }
    }

    .iconContainer {
        opacity: .4;
        cursor: pointer;
        transition: opacity .3s ease;

        &:hover {
            opacity: 1;
        }
    }

    .rating {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 30px;
    }

    .ratingValue {
        color: $yellow;
    }
</style>
