<template>
  <div class="mt-[140px] pb-[100px] container mx-auto">
    <h2 class="text-title text-center">
      {{
        success ? 'User successfully registered' : 'Working with POST request'
      }}
    </h2>

    <form
      v-if="!success"
      class="flex flex-col mt-[50px] max-w-[380px] mx-auto"
      @submit.prevent="sendData"
    >
      <!-- Name -->
      <TextField
        v-model.trim="name"
        type="text"
        placeholder="Enter name"
        label="Name"
        name="name"
        :disabled="formDisabled"
        :validator="nameValidator"
        :min="2"
        :max="60"
        @isValid="isValidHandler"
      />

      <!-- Email -->
      <TextField
        v-model.trim="email"
        type="email"
        placeholder="Enter email"
        label="Email"
        name="email"
        class="mt-[50px]"
        :disabled="formDisabled"
        :validator="emailValidator"
        :min="2"
        :max="100"
        @isValid="isValidHandler"
      />

      <!-- Phone -->
      <TextField
        v-model.trim="phone"
        type="tel"
        mask="+38 (0##) ### - ## - ##"
        placeholder="Enter phone"
        label="Phone"
        name="phone"
        class="mt-[50px]"
        :disabled="formDisabled"
        :validator="phoneValidator"
        @isValid="isValidHandler"
      >
        <template #helperText>
          <span class="text-gray-300">+38 (0XX) XXX - XX - XX</span>
        </template>
      </TextField>

      <!-- RadioBoxes -->
      <div class="mt-[43px]">
        <div class="text-base mb-1">Select your position</div>
        <RadioGroup
          v-if="positions && positions.length"
          v-model="radio"
          default-first
          :disabled="formDisabled"
          :list="radioList"
        />
        <span v-else class="pl-[16px] pt-[4px] text-sm text-danger">
          Positions not found
        </span>
      </div>

      <!-- Upload -->
      <div class="my-[50px]">
        <UploadInput
          accept=".jpeg, .jpg"
          :disabled="formDisabled"
          :max-size="5242880"
          @file="fileHandler"
          @isEmpty="fileIsEmptyHandler"
        />
        <div
          class="bg-background pl-[16px] pt-[4px] text-sm text-danger flex flex-col absolute"
        >
          <span v-for="(m, idx) in errorMessages" :key="idx">{{ m }}</span>
        </div>
      </div>

      <!-- Submit -->
      <div class="mx-auto flex justify-center">
        <Preloder v-if="loading" />
        <Button v-else :disabled="!formValid" @click="sendData">Sign up</Button>
      </div>

      <!-- Error -->
      <div
        v-if="formError"
        class="pl-[16px] mt-[10px] mx-auto text-sm text-danger"
      >
        {{ formError }}
      </div>
    </form>

    <div v-else>
      <img
        class="mt-[50px] mx-auto"
        src="~/assets/img/success.svg"
        alt="Success"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'NuxtForm',
  props: {
    positions: {
      type: Array,
      default: null,
    },
    token: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      name: null,
      email: null,
      phone: null,
      radio: null,
      file: null,
      errorMessages: [],
      inputNames: [
        { input: 'name', valid: false },
        { input: 'email', valid: false },
        { input: 'phone', valid: false },
        { input: 'photo', valid: false },
      ],
      formDisabled: false,
      formValid: false,
      loading: false,
      success: false,
      formError: null,
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
            errorMessage: `The email address "${this.email}" entered is not valid. `,
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
    radioList() {
      return this.positions.map((p) => ({
        label: p.name,
        value: p.id,
        checked: false,
      }))
    },
  },
  methods: {
    isEmpty(field) {
      return {
        valid: field?.trim()?.length,
        errorMessage: 'The field cannot be empty',
      }
    },
    fileIsEmptyHandler(state) {
      if (state || this.errorMessages.length) {
        if (state) this.errorMessages.push('The field cannot be empty')
        this.isValidHandler({ name: 'photo', valid: false })
      } else {
        this.isValidHandler({ name: 'photo', valid: true })
      }
    },
    photoValidator(file) {
      this.errorMessages = []
      const self = this

      const minSize = 70
      // check size
      const reader = new FileReader()
      reader.onload = function (theFile) {
        const image = new Image()
        image.onload = function () {
          if (this.width < minSize || this.height < minSize) {
            self.errorMessages.push('Minimum size of photo 70x70px')
          }
        }
        image.src = theFile.target.result
      }
      reader.readAsDataURL(file)

      if (!this.errorMessages.length) {
        this.isValidHandler({ name: 'photo', valid: true })
      } else {
        this.isValidHandler({ name: 'photo', valid: false })
      }
    },
    fileHandler(file) {
      this.file = file
      this.photoValidator(file)
    },
    isValidHandler(e) {
      this.inputNames = this.inputNames.map((i) => {
        if (i.input === e.name) {
          i.valid = e.valid
        }
        return i
      })
      this.formValid = this.inputNames.every((i) => i.valid)
    },

    async sendData() {
      this.formError = null
      this.loading = true
      this.formDisabled = true
      const phone = this.phone.replace(/[^+\d]/g, '')
      const formData = new FormData()

      formData.append('name', this.name)
      formData.append('email', this.email)
      formData.append('phone', phone)
      formData.append('position_id', this.radio)
      formData.append('photo', this.file)

      await this.$axios
        .post('/users', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Token: this.token,
          },
        })
        .then((res) => {
          this.$emit('submit', true)
          this.success = true
        })
        .catch((error) => {
          this.$emit('submit', false)
          this.formError =
            error?.response?.data?.message || 'Failed to submit form'
        })
        .finally(() => {
          this.loading = false
          this.formDisabled = false
        })
    },
  },
}
</script>
