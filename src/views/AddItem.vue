<template>
  <div class=" mx-auto ">
  <div class="d-flex justify-content-center gap-5">
      <div class="w-50">
           <div class="d-flex mb-2 justify-content-space-between">
          <router-link to="/">
              Back
          </router-link>
  </div>
          <b-card class="my-2 bg-light">
              <b-form @submit.stop.prevent="sendData">
              <b-form-group id="example-input-group-1" label="Name person"
              label-for="example-input-1">
              <b-form-input
              id="example-input-1"
          name="example-input-1"
              v-model="$v.form.name.$model"
              :state="validateState('name')"
                        aria-describedby="input-1-live-feedback"
              ></b-form-input>
              <b-form-invalid-feedback
          id="input-1-live-feedback"
        >This is a required field and must be at least 3 characters.</b-form-invalid-feedback>
      </b-form-group>
              <b-form-group id="example-input-group-2" label="Phone person"
              label-for="example-input-2">
              <b-form-input
              id="example-input-2"
          name="example-input-2"
              v-model="$v.form.phone.$model"
              :state="validateState('phone')"
                        aria-describedby="input-2-live-feedback"
              ></b-form-input>
              <b-form-invalid-feedback
          id="input-2-live-feedback"
        >This is a required field and must be at least 10 characters.</b-form-invalid-feedback>
      </b-form-group>
              <b-form-group id="example-input-group-3" label="Email person"
              label-for="example-input-3">
              <b-form-input
              id="example-input-3"
          name="example-input-3"
              v-model="$v.form.email.$model"
              :state="validateState('email')"
                        aria-describedby="input-3-live-feedback"
              ></b-form-input>
              <b-form-invalid-feedback
          id="input-3-live-feedback"
        >This is a required field and must be at least 5 characters.</b-form-invalid-feedback>
      </b-form-group>
              <b-form-group id="example-input-group-4" label="Company name"
              label-for="example-input-4">
              <b-form-input
              id="example-input-4"
          name="example-input-4"
              v-model="$v.form.company.name.$model"
              :state="validateState('company')"
                        aria-describedby="input-4-live-feedback"
              ></b-form-input>
              <b-form-invalid-feedback
          id="input-4-live-feedback"
        >This is a required field and must be at least 3 characters.</b-form-invalid-feedback>
      </b-form-group>
              </b-form>
          </b-card>
           <div class="d-flex justify-content-between">
          <b-button variant="danger" type="submit" @click="clearForm">Clear form</b-button>
          <b-button  variant="success" @click="sendData">Save</b-button>
      </div>
      </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required, minLength } from 'vuelidate/lib/validators';

const baseURL = 'https://jsonplaceholder.typicode.com/users';

export default {
  mixins: [validationMixin],
  name: 'addItem',
  data() {
    return {
      form: {
        name: null,
        phone: null,
        company: {
          name: null,
        },
        email: null,
      },
    };
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3),
      },
      phone: {
        required,
        minLength: minLength(10),
      },
      email: {
        required,
        minLength: minLength(5),
      },
      company: {
        name: {
          required,
          minLength: minLength(3),
        },
      },
    },
  },
  mounted() {
    if (this.item) {
      this.form = this.item;
    }
  },

  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    clearForm() {
      this.form.name = null;
      this.form.email = null;
      this.form.phone = null;
      this.form.company.name = null;
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    async sendData() {
      try {
        this.$v.form.$touch();
        if (this.$v.form.$anyError) {
          return;
        }
        await axios.post(baseURL, this.form);
        await this.$router.push('/');
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    ...mapState({
      item: (state) => state.item,
    }),
  },
  beforeDestroy() {
    console.log('hello from destroy');
    this.clearForm();
  },
};
</script>
