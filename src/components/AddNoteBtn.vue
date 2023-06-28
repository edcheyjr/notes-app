<script setup lang="ts">
import Add from '../assets/add.svg'

interface Props {
  toggle: (trigger: string) => void
}

const props = defineProps<Props>()
</script>
<template>
  <button
    @click="() => props.toggle('buttonTrigger')"
    type="button"
    class="p-3 rounded-xl shadow-md bg-amber-100/10 fixed top-[3%] right-[3%] hover:shadow-none transition ease-in"
  >
    <img
      :src="Add"
      alt="add"
      class="fill-current text-white hover:text-red-50 h-5 w-5"
    />
  </button>
</template>
