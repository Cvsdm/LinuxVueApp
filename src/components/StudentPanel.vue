<template>
  <v-container>

<div>
      <v-row>
          <h3>{{exerciseTitle}}</h3>
      </v-row>
      <v-row>
          <p v-html= "exerciseInstructions"></p>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'ExercisePage',
  props: {
    instructions: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },

  data: () => ({
    exerciseTitle: null,
    exerciseInstructions: null
  }),
  methods: {
    ...mapActions('exercises', ['fetchExercisesForSession', 'fetchExerciseForSession'])
  },
  async mounted () {
    await this.fetchExercisesForSession({ sessionId: this.$route.params.sId })
  },
  /* watch: {
    exoID: async function () {
      await this.fetchExerciseForSession({ sessionId: this.$route.params.sId, exerciseId: this.exoID })
      this.exercise = this.getExerciseById(this.exoID)
      // console.log(this.exercise)
    }
  } , */
  computed: {
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
