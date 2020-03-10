<template>
  <div class="panel">
    <ExercisePanel/>
  <StudentPanel :exoID="exoID"/>
  <Editor/>
  </div>
</template>

<script>
// @ is an alias to /src
import StudentPanel from '@/components/StudentPanel.vue'
import Editor from '@/components/Editor.vue'
import ExercisePanel from '@/components/ExercicePanel.vue'

export default {
  name: 'StudentView',
  components: {
    StudentPanel,
    Editor,
    ExercisePanel
  },
  data: () => ({
    exoID: 0
  }),
  watch: {
    $route (to, from) {
      this.updateExo()
    }
  },
  methods: {
    updateExo () {
      this.exoID = Number(this.$route.params.eId)
    }
  },
  mounted () {
    this.updateExo()
  }
}

</script>
