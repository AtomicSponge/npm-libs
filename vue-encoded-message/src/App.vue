<script setup lang="ts">
import EncodedMessage from './components/EncodedMessage.vue'
</script>

<template>
  <EncodedMessage
    class="message"
    :message="[189, 43, 190, 61]"
    font-color="yellow"
    :padding="32"
    :size="92"/>
</template>

<style scoped>
.message {
  border: 3px solid #ff00ff;
  border-radius: 16px;
}
</style>
