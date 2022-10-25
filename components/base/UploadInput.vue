<template>
  <div class="relative h-[54px]">
    <div
      class="bg-transparent select-none w-full flex h-full"
      :class="{ 'cursor-pointer': !disabled }"
      @click="$refs.file.click()"
    >
      <div
        class="px-[15px] py-[14px] text-base border border-solid rounded-l-[4px]"
        :class="
          disabled
            ? 'border-gray-100 text-gray-100'
            : 'border-black text-black '
        "
      >
        Upload
      </div>
      <div
        class="px-[16px] py-[14px] w-full text-base truncate border border-solid border-gray-100 border-l-0 rounded-r-[4px]"
        :class="disabled ? 'text-gray-100' : 'text-gray-300'"
      >
        <template v-if="fileName">
          {{ fileName }}
        </template>
        <template v-else> Upload your photo </template>
      </div>
    </div>
    <div
      class="bg-background pl-[16px] pt-[4px] text-sm text-danger flex flex-col absolute"
    >
      <span v-for="(m, idx) in errorMessages" :key="idx">{{ m }}</span>
    </div>
    <input
      ref="file"
      type="file"
      class="invisible h-0"
      :accept="accept"
      :disabled="disabled"
      @input="fileHandler"
    />
  </div>
</template>

<script>
export default {
  name: 'NuxtUploadInput',
  props: {
    accept: {
      type: [String, Array],
      default: null,
      validator: (v) => {
        const checkType = (arr) => {
          return arr.every(
            (i) => typeof i === 'string' && arr[0].charAt(0) === '.'
          )
        }

        if (Array.isArray(v)) {
          return checkType(v)
        } else {
          return typeof v === 'string' && v.length
            ? checkType(v.split(', '))
            : false
        }
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    maxSize: {
      type: Number,
      default: 1048576, // in bytes
    },
  },
  data() {
    return {
      fileName: null,
      errorMessages: [],
    }
  },
  methods: {
    chooseFile() {
      this.$refs.file.click()
    },
    fileHandler(e) {
      this.errorMessages = []
      this.fileName = null
      const file = e.target.files[0]
      if (file) {
        this.fileName = file.name
        if (file.size > this.maxSize) {
          e.target.value = null
          this.fileName = null
          const maxSizeMB = this.maxSize / 1024 / 1024
          this.errorMessages.push(`The maximum file size is ${maxSizeMB} MB.`)
        } else {
          this.$emit('file', file)
        }
      }
      this.$emit('isEmpty', !this.fileName)
    },
  },
}
</script>
