<template>
    <div :class="$style.cart">
        <transition name="fade">
            <div v-show="opened"
                 :class="$style.overlay"
                 @click="close"
            >
                оверлей
            </div>
        </transition>

        <transition name="slide">
            <div v-show="opened"
                 :class="$style.container"
            >
                <div :class="$style.cartHead">
                    <h1 :class="[$style.title, 'title']">Корзина</h1>
                    <Icon-close :class="$style.close"
                                @close="close"
                    />
                </div>

                <transition-group name="fade"
                                  @after-enter="afterEnter"
                >
                    <div v-if="items.length && !formSubmitted"
                         :key="'cartItems'"
                         :class="$style.cartBody">
                        <div :class="$style.cartBodyInner">
                            <div :class="$style.cartItemsList">
                                <p :class="[$style.subtitle, 'subtitle2']">Товары в корзине</p>
                                <Cart-item
                                    v-for="item in items"
                                    :key="item.name"
                                    :class="$style.cartItem"
                                    :item="item"
                                    @remove-item="removeItem"
                                />
                            </div>

                            <div :class="$style.form">
                                <p :class="[$style.subtitle, 'subtitle2']">Оформить заказ</p>
                                <form ref="catalogForm" action="#">
                                    <V-input
                                        :type="'text'"
                                        :placeholder="'Ваше имя'"
                                        :class="$style.input"
                                        :default-pattern="'^[A-zА-яЁё]+$'"
                                        :title="'Поле должно содержить только киррилицу и буквы латинского алфавита'"
                                        :required="true"
                                    />

                                    <V-input
                                        :type="'text'"
                                        :placeholder="'Телефон'"
                                        :data-mask="'+7 (___) ___-__-__'"
                                        :data-slots="'_'"
                                        :class="$style.input"
                                        :default-pattern="'^[+]7 \\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}'"
                                        :title="'Введите полностью номер телефона'"
                                        :required="false"
                                    />

                                    <V-input
                                        :type="'text'"
                                        :placeholder="'Адрес'"
                                        :class="$style.input"
                                        :required="true"
                                    />

                                    <V-button
                                        :type="'submit'"
                                        :class="$style.submit"
                                        @submit="onSubmit($event)"
                                    >
                                        Отправить
                                    </V-button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div v-else-if="!formSubmitted"
                         :key="'cartEmpty'"
                         :class="$style.cartBody"
                    >
                        <p :class="[$style.emptyText, 'subtitle1']">Пока что вы ничего не добавили корзину.</p>
                        <V-button
                            :type="'button'"
                            :class="$style.toCatalog"
                            @click="close"
                        >
                            Перейти к выбору
                        </V-button>
                    </div>

                    <div v-else
                         :key="'successScreen'"
                         :class="$style.successScreen"
                    >
                        <div :class="$style.successInfo">
                            <transition name="rotated-appear">
                                <p v-show="animateSuccess"
                                   :class="$style.okHand">&#128076;&#127995;</p>
                            </transition>
                            <transition name="appear">
                                <div v-show="animateSuccess"
                                     :class="$style.successText">
                                    <p :class="[$style.successTitle, 'subtitle']">Заявка успешно отправлена</p>
                                    <p :class="[$style.successSubtitle, 'p1']">Вскоре наш менеджер свяжется с Вами</p>
                                </div>
                            </transition>
                        </div>
                    </div>
                </transition-group>

            </div>
        </transition>
    </div>
</template>

<script>
    import VInput from '../ui/VInput'
    import VButton from '../ui/VButton'
    import IconClose from '../ui/icons/IconClose'
    import CartItem from './CartItem'

    export default {
        components: {
            VInput,
            VButton,
            IconClose,
            CartItem
        },
        props: {
            opened: {
                type: Boolean,
                required: true
            },
            items: {
                type: Array,
                required: true
            }
        },
        data () {
            return {
                formSubmitted: false,
                animateSuccess: false,
            }
        },
        mounted() {
            this.getLocalStorage()
        },
        methods: {
            getLocalStorage() {
                let localStorage = window.localStorage
                if(localStorage.cart) {
                    let items = JSON.parse(localStorage.cart)
                    this.$store.dispatch('cart/setCartGoods', items)
                }
            },
            removeItem(id) {
                this.$store.dispatch('cart/removeFromCart', id)
            },
            close() {
                this.$emit('close')
            },
            onSubmit($event) {
                let formValid = true;
                [...this.$refs.catalogForm.children].forEach(child => {
                    if(child.classList.contains(this.$style.input)) {
                        if(!child.validity.valid) formValid= false
                    }
                })
                if(formValid) {
                    $event.preventDefault()
                    this.onSuccess()
                }
            },
            onSuccess() {
                this.formSubmitted = true
            },
            afterEnter() {
                if(this.formSubmitted) {
                    this.$store.dispatch('cart/clearCart')
                    this.animateSuccess = true
                    setTimeout(() => {
                        this.formSubmitted = false
                        this.animateSuccess = false
                    }, 10000)
                }
            }
        },
    }
</script>

<style lang="scss" module>

    .close {
        top: 59px;
        right: 47px;
    }

    .title {
        margin-top: 0;
        margin-bottom: 24px;
    }

    .cartHead {
        padding: 0 24px;

        @include respond-to(mobile) {
            padding: 0 12px;
        }
    }

    .cartBody {
        height: 100%;
        padding: 0 24px;
        overflow-y: scroll;

        @include respond-to(mobile) {
            padding: 0 12px;
        }
    }

    .cartBodyInner {
        padding-bottom: 52px;
    }

    .subtitle {
        color: $grey;
        margin-bottom: 16px;
    }

    .cartItemsList {
        margin-bottom: 32px;
    }

    .cartItem {
        margin-bottom: 12px;

        &:last-child {
            margin-bottom: 0;
        }
    }

    .container {
        position: absolute;
        z-index: 2;
        box-sizing: border-box;
        top: 0;
        right: 0;
        width: 460px;
        height: 100vh;
        padding: 52px 24px;
        box-shadow: -4px 0px 16px rgba(0, 0, 0, .05);
        background-color: white;

        @include respond-to(mobile) {
            width: 100%;
            min-width: 320px;
            padding: 52px 12px;
        }
    }

    .overlay {
        position: absolute;
        z-index: 1;
        box-sizing: border-box;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        font-size: 0;
        color: transparent;
        background-color: rgba(255, 255, 255, .6);
    }

    .input {
        width: 100%;
        margin-bottom: 16px;

        &:last-child {
            margin-bottom: 24px;
        }
    }

    .submit,
    .toCatalog {
        width: 100%;
    }

    .emptyText {
        color: $black;
        margin-bottom: 24px;
    }

    .successScreen {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: calc(100% - 117px);
        top: 117px;
        left: 0;
        background-color: white;
        text-align: center;
    }

    .successInfo {
        transform: translateY(-50%);
    }

    .okHand {
        margin-bottom: 24px;
        font-size: 80px;
    }

    .successTitle {
        margin-bottom: 2px;
    }

    .successSubtitle {
        color: $grey;
    }
</style>
