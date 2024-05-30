<!--
  vue-image-zoom
  Copyright (c) 2024-present Matthew Evans - See LICENSE.md

  Adapted from:  https://codeconvey.com/html-image-zoom-on-click/
-->

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  /** HTML Element ID */
  id?:string
  /** URL to image source */
  src:string
  /** Alternate text for image */
  alt?:string
  /** Width of document image */
  width?:string
  /** Height of document image */
  height?:string
  /** Caption for modal display */
  caption?:string
}>()

/** Flag to show the image modal */
const _showModal = ref(false)
/** Reference to the modal content */
const _modalName = ref('modal-content')

/** Show modal and zoom in */
const zoomIn = () => { _showModal.value = true }

/** Zoom out and hide modal */
const zoomOut = () => {
  _modalName.value += ' out'
  setTimeout(() => {
    _showModal.value = false
    _modalName.value = 'modal-content'
  }, 400)
}
</script>

<template>
  <img :id :src :alt :width :height class="mainImg" @click="zoomIn()">
  <div v-show="_showModal" class="modal" @click="zoomOut()">
    <img :src :alt :class="_modalName">
    <div v-show="caption" class="caption">{{ caption }}</div>
  </div>
</template>

<style lang="stylus" scoped>
.mainImg
  cursor pointer
  transition 0.3s
.mainImg:hover
  opacity 0.7
.caption
  margin auto
  display block
  width 80%
  max-width 700px
  text-align center
  color rgb(204, 204, 204)
  font-size 1.2em
  font-weight 800
  padding 10px 0
.modal
  position fixed
  z-index 99
  left 0
  top 0
  padding 10px 0
  width 100%
  height 100%
  overflow auto
  background-color rgba(0, 0, 0, 0.9)
.modal-content
  margin auto
  display block
  height 94%
  max-width 94%
  max-height 94%

/* Zoom in */
@-webkit-keyframes zoom
  from { -webkit-transform:scale(1) }
  to { -webkit-transform:scale(2) }
@keyframes zoom
  from { transform:scale(0.4) }
  to { transform:scale(1) }

/* Zoom out */
@-webkit-keyframes zoom-out
  from { transform:scale(1) }
  to { transform:scale(0) }
@keyframes zoom-out
  from { transform:scale(1) }
  to { transform:scale(0) }

.modal-content
  -webkit-animation-name zoom
  -webkit-animation-duration 0.6s
  animation-name zoom
  animation-duration 0.6s
.out
  animation-name zoom-out
  animation-duration 0.6s
@media only screen and (max-width: 700px)
  .modal-content
    margin auto
    display block
    width 100%
    height: auto
    max-width 100%
    max-height 100%
</style>
