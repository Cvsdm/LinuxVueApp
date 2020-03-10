<template>
  <div class="panel">
  <StudentPanel/>
  <Editor/>
  </div>
</template>

<script>
// @ is an alias to /src
import StudentPanel from '@/components/StudentPanel.vue'
import Editor from '@/components/editor.vue'

export default {
  name: 'StudentView',
  components: {
    StudentPanel,
    Editor
  }
}

</script>
