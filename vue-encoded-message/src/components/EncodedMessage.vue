<script setup lang="ts">
import { ref, onMounted, onUpdated } from 'vue'

const canvas = ref()

const canvasWidth = ref(100)
const canvasHeight = ref(16)

const props = defineProps<{
  message:Array<number>
  size:number
  fontFace?:string
}>()

/**
 * Draw the text
 * @param ctx Canvas to draw to
 */
const drawText = (ctx:CanvasRenderingContext2D) => {
  ctx.fillStyle = 'white'
  ctx.font = `${props.size}px ${props.fontFace || 'Arial'}`
  const textSize = ctx.measureText(String.fromCharCode(...props.message))
  canvasWidth.value = textSize.width + 4
  ctx.fillStyle = 'white'
  ctx.font = `${props.size}px ${props.fontFace || 'Arial'}`
  ctx.textBaseline = 'middle'
  ctx.fillText(String.fromCharCode(...props.message), 2, (props.size / 2) + 2)
}

onMounted(() => {
  canvasHeight.value = props.size
  //  Draw on load
  drawText(canvas.value.getContext('2d'))
})

onUpdated(() => {
  //  Draw if there's an update
  drawText(canvas.value.getContext('2d'))
})
</script>

<template>
  <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
</template>

<style scoped>
</style>
