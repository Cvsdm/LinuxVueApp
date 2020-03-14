<template>
  <div class="panel">
    <v-row>
    <v-col>
    <ExercisePanel/>
    </v-col>
      <v-col>
  <StudentPanel :exoID="exoID"/>
    <Editor/>
      </v-col>
      <v-col>
<TestResults/>
  </v-col>
  </v-row>
  </div>
</template>

<script>
// @ is an alias to /src
import StudentPanel from '@/components/StudentPanel.vue'
import Editor from '@/components/Editor.vue'
import ExercisePanel from '@/components/ExercicePanel.vue'
import TestResults from '@/components/testsResult.vue'

export default {
  name: 'StudentView',
  components: {
    StudentPanel,
    Editor,
    ExercisePanel,
    TestResults
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
