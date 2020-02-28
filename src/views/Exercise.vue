<template>
  <div class="exercise">
    <ExercisePage/>
  </div>
</template>

<script>
// @ is an alias to /src
import ExercisePage from '@/components/ExercisePage.vue'

export default {
  name: 'Exercise',
  components: {
    ExercisePage
  }
}
</script>
