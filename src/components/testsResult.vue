<template>
  <v-container>

<h3> Tests </h3>
<div v-if="this.attempt != null">
      <v-row>
        <v-col class="d-flex" cols="12" sm="6">
          <h3>{{attempt.title}}</h3>
        </v-col>
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
    this.attempt = this.getLastAttemptForExercise(this.$route.params.eId)
    console.log(this.attempt)
  },
  computed: {
    ...mapGetters('attempts', ['getLastAttemptForExercise'])
  }
}
</script>
<style>
.display {
  position: relative;
  height: 20rem;
}
</style>
