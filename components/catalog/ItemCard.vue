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
        <div :ref="'productImg'"
             :class="$style.image"
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
        data() {
            return {
               imgClone: null,
               animationReady: true
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
                if(this.animationReady) this.animateAdd()
                this.$store.dispatch('cart/addToCart', this.item)
            },
            prepareAnimation () {
                this.animationReady = false

                let productImg = this.$refs.productImg,
                    productImgCoords = productImg.getBoundingClientRect(),
                    [Ximg, Yimg] = [productImgCoords.x, productImgCoords.y]

                this.imgClone = productImg.cloneNode(true)

                this.imgClone.classList.add(`${this.$style.imageClone}`)
                this.imgClone.style.width = productImg.offsetWidth + 'px';
                [this.imgClone.style.left, this.imgClone.style.top] = [Ximg + 'px', Yimg + 'px']
                document.body.appendChild(this.imgClone)
            },
            animateAdd () {
                this.prepareAnimation()

                let cartIcon = document.getElementById('headerCartIcon'),
                    [Xcart, Ycart] = [cartIcon.offsetLeft - this.imgClone.offsetWidth / 2,
                                      cartIcon.offsetTop - this.imgClone.offsetHeight / 2]

                this.imgClone.addEventListener('transitionend', (event) => {
                    if (event.propertyName === 'transform') {
                        this.imgClone.remove()
                        this.imgClone = null
                        this.animationReady = true
                    }
                })

                setTimeout(() => {
                    [this.imgClone.style.left, this.imgClone.style.top] = [Xcart + 'px', Ycart + 'px']
                    this.imgClone.style.transform = 'scale(0)'
                }, 10)
            }
        }
    }
</script>

<style lang="scss" module>
    .title {
        margin-bottom: 6px;
        color: $grey;
    }

    .price {
        color: $black;
        font-weight: bold;
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
            transform: translate3d(0, -3px, 0);
            box-shadow: 0 4px 16px rgba(0, 0, 0, .1)
        }

        @include respond-to(laptop) {
            width: calc(25% - 16px);
        }

        @include respond-to(tablet) {
            width: calc(50% - 16px);
        }

        @include respond-to(mobile) {
            width: calc(100% - 16px);

            &:hover {
                transform: none;
                box-shadow: 0 4px 16px rgba(0, 0, 0, .05);
            }
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

    .imageClone {
        position: fixed;
        z-index: 11;
        height: 180px;
        font-size: 0;
        color: transparent;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;
        transform: scale(1);
        transition: all 0.6s ease;
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
