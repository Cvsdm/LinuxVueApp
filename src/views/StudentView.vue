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
import ExercisePanel from '@/components/ExercisePanel.vue'
import TestResults from '@/components/testsResult.vue'
import { mapActions } from 'vuex'

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
    ...mapActions('modules', ['fetchModule']),
    ...mapActions('sessions', ['fetchSessionsForModule', 'fetchSession']),
    ...mapActions('exercises', ['fetchExercisesForSession', 'fetchExerciseForSession']),

    updateExo () {
      this.exoID = Number(this.$route.params.eId)
      console.log('rID : ' + this.$route.params.eId)
    }
  },
  async mounted () {
    await this.fetchSession({ id: this.$route.params.sId })
    await this.fetchExercisesForSession({ sessionId: this.$route.params.sId })
    this.updateExo()
  }
}

</script>
