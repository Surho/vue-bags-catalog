<template>
        <input :type="type"
               :required="required"
               :placeholder="placeholder"
               :data-mask="dataMask"
               :data-slots="dataSlots"
               :pattern="defaultPattern"
               :title="title"
               :class="[$style.input, 'p1']"
        >
</template>

<script>
    import { handleMask } from '../../assets/js/utils'

    export default {
        props: {
            type: {
                type: String,
                default: 'text'
            },
            placeholder: {
                type: String,
            },
            dataSlots: {
                type: String
            },
            dataMask: {
                type: String
            },
            required: {
                type: Boolean
            },
            defaultPattern: {
                type: [RegExp, String]
            },
            title: {
                type: String
            }
        },
        mounted() {
            if(this.dataMask && this.dataSlots) handleMask()
        }
    }
</script>

<style lang="scss" module>
    .input {
        box-sizing: border-box;
        width: 100%;
        padding: 14px 14px 15px 14px;
        background-color: $grey-extra-light;
        border-radius: 8px;
        color: $black;
        border: none;
        outline: none;

        &::placeholder {
            color: $grey-light;
        }
    }
</style>
