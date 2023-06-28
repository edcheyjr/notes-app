<template>
  <div>
    <input type="text" class="" placeholder="Search..." />
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<string>()
console.log('props', props)
</script>
