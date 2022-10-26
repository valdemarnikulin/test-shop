<template>
  <div class="d-flex justify-content-between">
<card-item
    @closeCard="closePopup"
    v-if="showPopupInfo"
    :personName="item.name"
    >
<div>User phone: {{item.phone}}</div>
<div>User email: {{item.email}}</div>
<div>User company name: {{item.company.name}}</div>
    </card-item>
      <div >{{item.name}}</div>
      <div class="d-flex gap-2">
          <b-button
                      size="sm"
                      variant="outline-primary"
                      @click="editItem(item)">
                          <b-icon icon="pencil-fill" />
                      </b-button>
      <b-button
      size="sm"
      variant="secondary"
      @click="showPopup"
      > show more</b-button>
                      <b-button
                       size="sm"
                       variant="danger"
                      @click="deleteItem(item)">
                          <b-icon icon="trash"  />
                      </b-button>
      </div>
  </div>
</template>

<script>
import CardItem from '@/components/CardItem.vue';
import axios from 'axios';
import { mapActions } from 'vuex';

const baseURL = 'https://jsonplaceholder.typicode.com/users';
export default {
  components: { CardItem },
  props: {
    item: {
      type: Object,
    },
  },
  data() {
    return {
      showPopupInfo: false,
    };
  },
  methods: {
    ...mapActions(['getCurrentTask']),
    showPopup() {
      console.log('hello from popup');
      this.showPopupInfo = true;
    },
    closePopup() {
      this.showPopupInfo = false;
    },
    async editItem(item) {
      await this.getCurrentTask(item);
      this.$router.push('/addItem');
    },
    async  deleteItem(item) {
      try {
        await axios
          .delete(`${baseURL}/${item.id}`);
        await this.$emit('deleteElement');
        console.log('SUCCESS!!');
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
</style>
