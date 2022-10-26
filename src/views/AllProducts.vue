<template>
  <div class="position-relative">
      <div class="d-flex flex-row justify-content-between mx-4">
          <div >Users
              <div class="bg-secondary py-1 px-2 rounded-circle">{{allItems}}</div>
              </div>
         <router-link to="/addItem"> <b-button variant="primary">Add user</b-button></router-link>
      </div>
<b-card class="mx-4 my-4 position-relative">
    <template>
        <div class="my-4">
            <b-form-group
      label="Search"
      label-for="input-horizontal"
      label-size="lg"
      content-cols-sm
      content-cols-lg="4"
      label-class="d-flex"
            >
                <b-input id="input-horizontal"
                 placeholder="Please write name for search."
                  v-model="search" type="search">
                  </b-input>
            </b-form-group>
        </div>
    </template>
<b-table
v-if="dataReady"
:per-page="perPage"
:current-page="currentPage"
id="my-table"
responsive="sm"
:items="filterItems"
:fields="fields">
            <template #cell(Users)="{ item }">
                <my-user :item="item" @deleteElement="delItem()"></my-user>
            </template>
        </b-table>
        <div class="d-flex justify-content-center">
              <b-pagination
     v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
      first-text="First"
      prev-text="Prev"
      next-text="Next"
      last-text="Last"
    ></b-pagination>
        </div>
        </b-card>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';
import MyUser from '@/components/MyUser.vue';

const baseURL = 'https://jsonplaceholder.typicode.com/users';

export default {
  name: 'AllProducts',
  components: {
    MyUser,
  },
  async mounted() {
    await this.getAllData();
    this.dataReady = true;
    console.log('mounted');
  },
  data() {
    return {
      showPopupInfo: false,
      dataReady: false,
      items: [],
      fields: [
        'Users',
      ],
      search: '',
      selected: [],
      perPage: 5,
      currentPage: 1,
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
    async getAllData() {
      try {
        const res = await axios.get(baseURL);
        this.items = res.data;
      } catch (error) {
        console.error(error);
      }
    },
    async editItem(item) {
      await this.getCurrentTask(item);
      this.$router.push('/addItem');
    },
    async  deleteItem(item) {
      try {
        await axios
          .delete(`${baseURL}/${item.id}`);
        await this.getAllData();
      } catch (error) {
        console.log(error);
      }
    },
    async delItem() {
      try {
        console.log('rerender');
        await this.getAllData();
      } catch (error) {
        console.error(error);
      }
    },
    selection(item) {
      if (item.status === true) {
        this.selected.push(item);
      }
    },

  },
  computed: {
    allItems() {
      return this.items.length;
    },
    rows() {
      return this.filterItems.length;
    },
    filterItems() {
      return this.items.filter((el) => el.name.toLowerCase().includes(this.search));
    },
  },
};
</script>

<style>
</style>
