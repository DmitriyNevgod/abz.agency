<template>
  <div class="mt-[140px] pb-[100px] container mx-auto">
    <h2 class="text-title text-center">Working with POST request</h2>

    <form
      class="flex flex-col mt-[50px] max-w-[380px] mx-auto"
      @submit.prevent="null"
    >
      <!-- Name -->
      <TextField
        v-model.trim="name"
        type="text"
        placeholder="Enter name"
        label="Name"
        name="name"
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
        <RadioGroup v-model="radio" default-first :list="radioList" />
      </div>

      <!-- Upload -->
      <div class="my-[50px]">
        <UploadInput
          accept=".jpeg, .jpg"
          :max-size="5242880"
          @file="photoValidator"
          @isEmpty="fileIsEmptyHandler"
        />
        <div
          class="bg-background pl-[16px] pt-[4px] text-sm text-danger flex flex-col absolute"
        >
          <span v-for="(m, idx) in errorMessages" :key="idx">{{ m }}</span>
        </div>
      </div>
      <div class="mx-auto flex justify-center">
        <Preloder v-if="loading" />
        <Button v-else :disabled="!formValid" @click="submit">Sign up</Button>
      </div>
    </form>
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
      formValid: false,
      loading: null,
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

    submit() {
      // console.log('submit')
    },
  },
}
</script>
