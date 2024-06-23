<script setup lang="ts">
import { ref, onMounted, onUpdated } from 'vue'

const canvas = ref()

const canvasWidth = ref(0)
const canvasHeight = ref(0)

const props = defineProps<{
  message:Array<number>
  size:number
  padding?:number
  fontFace?:string
  fontColor?:string
}>()

/**
 * Draw the text
 * @param ctx Canvas to draw to
 */
const drawText = (ctx:CanvasRenderingContext2D) => {
  //  Default to Arial and not inherit to prevent rendering issues
  ctx.font = `${props.size}px ${props.fontFace || 'Arial'}`
  const {
    width,
    actualBoundingBoxAscent,
    actualBoundingBoxDescent
  } = ctx.measureText(String.fromCharCode(...props.message))

  canvasWidth.value = width + (props.padding || 0)
  const height = actualBoundingBoxAscent - actualBoundingBoxDescent
  canvasHeight.value = height + (props.padding || 0)
  ctx.fillStyle = props.fontColor || 'white'
  ctx.font = `${props.size}px ${props.fontFace || 'inherit'}`
  ctx.textAlign = 'center'
  ctx.fillText(
    String.fromCharCode(...props.message),
    canvasWidth.value / 2,
    canvasHeight.value / 2 + height / 2
  )
}

onMounted(() => {
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
