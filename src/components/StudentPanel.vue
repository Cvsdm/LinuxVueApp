<template>
  <v-container>
      <v-col>
        <v-row v-for="exercise in exercises" :key="exercise.id">
        <v-card
          class="mx-auto"
          width="180px"
          height="100%"
          @click="goExercise(exercise.id)"
        >
          <v-system-bar v-if="exercise.valid!=null" color="#0aa612" height="100%">
            <v-card-text>
              <p>{{exercise.title}}</p>
            </v-card-text>
          </v-system-bar>
          <v-system-bar v-else color="#687178" height="100%">
            <v-card-text>
              <p>{{exercise.title}}</p>
            </v-card-text>
          </v-system-bar>
        </v-card>
        </v-row>
      </v-col>
<div v-if="this.exercise != null">
      <v-row>
        <v-col class="d-flex" cols="12" sm="6">
          <h3>{{this.exercise.title}}</h3>
          <p>{{this.exercise.instructions}}</p>
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

  data: () => ({
    exercise: null
  }),
  methods: {
    ...mapActions('modules', ['fetchModule']),
    ...mapActions('sessions', ['fetchSessionsForModule', 'fetchSession']),
    ...mapActions('exercises', ['fetchExercisesForSession']),

    goExercise (eID) {
      this.$router.push({ name: 'StudentExercise', params: { mId: this.$route.params.mId, sId: this.$route.params.sId, eId: eID } })
      this.exercise = this.getExerciseById(eID)
    }
  },
  async mounted () {
    await this.fetchSession({ id: this.$route.params.sId })
    await this.fetchExercisesForSession({ sessionId: this.$route.params.sId })

    console.log('exercises' + JSON.stringify(this.exercises))

    this.exercise = this.getExerciseById(this.$route.params.eId)

    console.log(this.exercise)
  },
  computed: {
    ...mapState('sessions', ['sessions']),
    ...mapState('exercises', ['exercises']),
    ...mapGetters('exercises', ['getExerciseById'])
  }
}
</script>
<style>
.exercise-editor-ace-editor {
  position: relative;
  height: 20rem;
}

.display {
  position: relative;
  height: 20rem;
}
</style>
