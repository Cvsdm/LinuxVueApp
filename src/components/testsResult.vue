<template>
  <v-container>

<h3> Tests </h3>
<div v-if="attempt">
      <v-row>
          <h3>{{attempt.title}}</h3>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'testsResult',

  data: () => ({
    attempt: null
  }),
  methods: {
    ...mapActions('attempts', ['fetchLastAttemptForExercise'])
  },
  async mounted () {
    await this.fetchLastAttemptForExercise({ sessionId: this.$route.params.sId, exerciseId: this.$route.params.eId })
    this.LastAttempt = this.getLastAttemptForExercise(this.$route.params.eId)
    this.attempt = this.getAttemptById(this.LastAttempt.id)
    console.log(this.attempt)
  },
  computed: {
    ...mapGetters('attempts', ['getLastAttemptForExercise', 'getAttemptById'])
  }
}
</script>
<style>
.display {
  position: relative;
  height: 20rem;
}
</style>
