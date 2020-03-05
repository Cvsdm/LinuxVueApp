<template>
  <v-container>
      <v-row v-for="module in modules" v-bind:key="module.id">
          <v-btn text large @click="moreInfoModule">{{module.name}}</v-btn>
      <v-row>
          <v-col v-for="session in sessions" v-bind:key="session.id">
            <v-card
              class="mx-auto"
              max-width="344"
            >
    <v-card-text>
      <p class="display-1 text--primary">
        {{session.name}}
      </p>
    </v-card-text>
  </v-card>
          </v-col>
      </v-row>
      </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {

  name: 'ModulesPage',

  data: () => ({
  }),
  methods: {
    ...mapActions('modules', ['fetchModules']),
    ...mapActions('sessions', ['fetchSessionsForModule']),
    ...mapActions('exercises', ['fetchExercisesForSession']),

    MoreInfoModule (moduleId) {
      this.$router.push({ name: 'module', params: { moduleId: moduleId } })
    }
  },
  async mounted () {
    await this.fetchModules()
    await Promise.all(this.modules.map(m => this.fetchSessionsForModule({ moduleId: m.id })))
    await Promise.all(this.sessions.map(s => this.fetchExercisesForSession({ sessionId: s.Id })))

    console.log('modules: ' + JSON.stringify(this.modules))
    console.log('sessions: ' + JSON.stringify(this.sessions))
    console.log('exercises: ' + JSON.stringify(this.exercises))
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
