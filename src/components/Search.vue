<script lang="ts" setup>
import Search from '../assets/search-normal.svg'

interface Props {
  query: string
}

const { query } = defineProps<Props>()
</script>

<template>
  <div
    class="w-full flex relative xl:fixed xl:right xl:w-fit top-[3%] xl:trasform xl:translate-x-[75%] xl:left-1/2"
  >
    <input
      type="text"
      class="bg-white/10 font-normal text-base rounded-sm px-2 placeholder-gray-400 w-full py-2 mt-2"
      placeholder="Search..."
      v-model="query"
    />
    <img
      :src="Search"
      alt="search"
      srcset=""
      class="h-5-w-5 absolute right-5 transform translate-y-[50%] bottom-1/2 top-1 opacity-60"
    />
  </div>
</template>
