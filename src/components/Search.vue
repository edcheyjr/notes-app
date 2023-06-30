<script lang="ts" setup>
import Search from '../assets/search-normal.svg'

const SEARCH_EVENT = 'update:modelValue'

defineProps({
  modelValue: String,
})

// defines what events our component emits
defineEmits([SEARCH_EVENT])
</script>

<template>
  <div
    class="w-full mr-6 flex relative xl:fixed xl:right xl:w-fit top-[3%] xl:left-[57.5%] 2xl:left-[58%]"
  >
    <input
      type="text"
      class="bg-white/10 font-normal text-base rounded-sm px-2 placeholder-gray-400 w-full py-2 mt-2"
      placeholder="Search..."
      :value="modelValue"
      @input="$emit(SEARCH_EVENT, $event?.target?.value)"
      @keypress.enter="$emit(SEARCH_EVENT, $event?.target?.value)"
    />
    <img
      :src="Search"
      alt="search"
      srcset=""
      class="h-5-w-5 absolute right-5 transform translate-y-[50%] bottom-1/2 top-1 opacity-60"
    />
  </div>
</template>
