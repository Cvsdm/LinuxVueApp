<template>
  <div class="panel">
  <StudentPanel/>
  </div>
</template>

<script>
// @ is an alias to /src
import StudentPanel from '@/components/StudentPanel.vue'

export default {
  name: 'StudentView',
  components: {
    StudentPanel
  }
}
</script>
