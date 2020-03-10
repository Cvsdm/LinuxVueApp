<template>
  <v-container>

<div v-if="this.exercise != null">
      <v-row>
        <v-col class="d-flex" cols="12" sm="6">
          <h3>{{exercise.title}}</h3>
          <p v-html= "exercise.instructions"></p>
        </v-col>
        <v-col cols="12" md="6">
          <h3>Tests</h3>
          <div></div>
        </v-col>
      </v-row>
    </div>
    <div></div>
  </v-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'ExercisePage',
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
    ...mapActions('modules', ['fetchModule']),
    ...mapActions('sessions', ['fetchSessionsForModule', 'fetchSession']),
    ...mapActions('exercises', ['fetchExercisesForSession', 'fetchExerciseForSession'])
  },
  async mounted () {
    await this.fetchSession({ id: this.$route.params.sId })
    await this.fetchExercisesForSession({ sessionId: this.$route.params.sId })
  },
  watch: {
    exoID: async function () {
      await this.fetchExerciseForSession({ sessionId: this.$route.params.sId, exerciseId: this.exoID })
      this.exercise = this.getExerciseById(this.exoID)
    }
  },
  computed: {
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
