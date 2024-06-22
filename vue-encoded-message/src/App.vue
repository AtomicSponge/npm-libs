<script setup lang="ts">
import EncodedMessage from './components/EncodedMessage.vue'
</script>

<template>
  <EncodedMessage class="message" :message="[189, 43, 190, 61]" :size="32"/>
</template>

<style lang="stylus" scoped>
.message
  border 1px solid #ffffff
</style>
