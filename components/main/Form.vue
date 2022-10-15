<template>
  <div class="mt-[140px] pb-[100px] container mx-auto">
    <h2 class="text-title text-center">Working with POST request</h2>

    <form class="flex flex-col mt-[50px] max-w-[380px] mx-auto">
      <!-- Name -->
      <TextField
        v-model.trim="name"
        type="text"
        placeholder="Enter name"
        label="Name"
        :validator="nameValidator"
      />

      <!-- Email -->
      <TextField
        v-model.trim="email"
        type="email"
        placeholder="Enter email"
        label="Email"
        class="mt-[50px]"
        :validator="emailValidator"
      />

      <!-- Phone -->
      <TextField
        v-model.trim="phone"
        type="tel"
        mask="+38 (0##) ### - ## - ##"
        placeholder="Enter phone"
        label="Phone"
        class="mt-[50px]"
        :validator="phoneValidator"
      >
        <template #helperText>
          <span class="text-grey-300">+38 (0XX) XXX - XX - XX</span>
        </template>
      </TextField>
    </form>
  </div>
</template>

<script>
export default {
  name: 'NuxtForm',
  data() {
    return {
      name: null,
      email: null,
      phone: null,
    }
  },
  computed: {
    nameValidator() {
      return [
        () => this.isEmpty(this.name),
        () => {
          const regName =
            /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/
          return {
            valid: regName.test(this.name),
            errorMessage: 'Name must be complete and valid "John Doe"',
          }
        },
      ]
    },
    emailValidator() {
      return [
        () => this.isEmpty(this.email),
        () => {
          const regName =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return {
            valid: String(this.email).toLowerCase().match(regName),
            errorMessage: `The email address ${this.email} entered is not valid. `,
          }
        },
      ]
    },
    phoneValidator() {
      return [
        () => this.isEmpty(this.phone),
        () => {
          return {
            valid: this.phone?.length === 23,
            errorMessage: 'Phone is not valid. Enter the full number.',
          }
        },
      ]
    },
  },
  methods: {
    isEmpty(field) {
      return {
        valid: field?.trim()?.length,
        errorMessage: 'The field cannot be empty.',
      }
    },
  },
}
</script>
