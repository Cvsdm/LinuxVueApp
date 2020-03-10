<template>
  <v-container>
      <v-row v-for="module in modules" v-bind:key="module.id">
          <h2> {{module.name}} </h2>
      <v-row v-for="session in sessions" v-bind:key="session.id">
      <v-row><p class="display-1 text--primary">{{session.name}}</p></v-row>
      <v-row>
            <v-col v-for="exercise in exercises" v-bind:key="exercise.id">
             <v-card
              class="mx-auto"
              width="180px"
              height="100%"
              @click="goExercise(session.id, exercise.id)"
            >
            <v-system-bar
              v-if="exercise.valid!=null"
              color="#0aa612"
              height="100%"
            ><v-card-text>
                <p>
                  {{exercise.title}}
                </p>
              </v-card-text>
            </v-system-bar>
            <v-system-bar
              v-else
              color="#687178"
              height="100%"
            >
            <v-card-text>
                <p>
                  {{exercise.title}}
                </p>
              </v-card-text>
            </v-system-bar>
            </v-card>
          </v-col>
         </v-row>
      </v-row>
      </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {

  name: 'ModulesPage',

  data: () => ({
    nameModule: 'Im name of module'
  }),
  methods: {
    ...mapActions('modules', ['fetchModule']),
    ...mapActions('sessions', ['fetchSessionsForModule']),
    ...mapActions('exercises', ['fetchExercisesForSession']),

    goExercise (sID, eID) {
      this.$router.push({ name: 'StudentExercise', params: { mId: this.$route.params.id, sId: sID, eId: eID } })
    }
  },
  async mounted () {
    await this.fetchModule({ id: this.$route.params.id })
    await this.fetchSessionsForModule({ moduleId: this.$route.params.id })
    await Promise.all(this.sessions.map(s => this.fetchExercisesForSession({ sessionId: s.id })))
  },
  computed: {
    ...mapState('modules', ['modules']),
    ...mapState('sessions', ['sessions']),
    ...mapState('exercises', ['exercises'])
  }
}

</script>

<style>
</style>
