<template>
  <v-container>

<div v-if="this.exercise != null">
      <v-row>
          <h3>{{exercise.title}}</h3>
      </v-row>
      <v-row>
          <p v-html= "exercise.instructions"></p>
      </v-row>
      <Editor v-bind:template_regions= "exercise.template_regions"
              v-bind:template_regions_rw="exercise.template_regions_rw"/>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import Editor from './Editor'

export default {
  name: 'ExercisePage',
  components: {
    Editor
  },
  props: {
    exoID: {
      type: Number,
      required: true
    }
  },

  data: () => ({
    exercise: null
  }),
  methods: {
    ...mapActions('exercises', ['fetchExercisesForSession', 'fetchExerciseForSession']),
    ...mapActions('modules', ['fetchModules']),
    ...mapActions('sessions', ['fetchSessionsForModule'])
  },
  async mounted () {
    await this.fetchModules()
    await Promise.all(this.modules.map(m => this.fetchSessionsForModule({ moduleId: m.id })))
    await Promise.all(this.sessions.map(s => this.fetchExercisesForSession({ sessionId: s.id })))
    await this.fetchExercisesForSession({ sessionId: this.$route.params.sId })
    await this.fetchExerciseForSession({ sessionId: this.$route.params.sId, exerciseId: this.exoID })
  },
  watch: {
    exoID: async function () {
      await this.fetchExerciseForSession({ sessionId: this.$route.params.sId, exerciseId: this.exoID })
      this.exercise = this.getExerciseById(this.exoID)
    }
  },
  computed: {
    ...mapState('modules', ['modules']),
    ...mapState('sessions', ['sessions']),
    ...mapState('exercises', ['exercises']),
    ...mapGetters('exercises', ['getExerciseById'])
  }
}
</script>
<style>
.display {
  position: relative;
  height: 20rem;
}
</style>
