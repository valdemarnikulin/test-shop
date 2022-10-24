<template>
<div class="item__wrapper" ref="card__wrapper">
    <b-card
    class="item"
     border-variant="primary"
          :header="personName"
          header-bg-variant="primary"
          header-text-variant="white"
     >
            <div class="item__header">
            </div>
            <div class="item__content">
                <slot></slot>
            </div>
                <b-button variant="danger" size="sm" @click="closeCard">close</b-button>
    </b-card>
</div>
</template>

<script>
export default {
  props: {
    personName: {
      type: String,
    },
  },
  data() {
    return {

    };
  },
  mounted() {
    const vm = this;
    document.addEventListener('click', (item) => {
      if (item.target === vm.$refs.card__wrapper) {
        vm.closeCard();
      }
    });
  },
  methods: {
    closeCard() {
      this.$emit('closeCard');
    },
  },
};
</script>

<style scoped lang="scss">
.item{
    position: fixed;
    top: 50px;
    width: 400px;
    box-shadow: 0 0 17px 0 #242424;
    z-index: 10;
    &__wrapper{
        position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-content: center;
}
    &__header{
         display: flex;
    justify-content: space-between;
    padding: 10px;
    }
}
</style>
