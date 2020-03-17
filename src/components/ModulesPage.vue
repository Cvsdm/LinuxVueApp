<template>
  <v-container>
    <v-row>
      <div v-for="module in modules" v-bind:key="module.id">
      <v-row >
          <v-btn text large @click="moreInfoModule(module.id)">{{module.name}}</v-btn>
      </v-row>
      <v-row>
          <v-col v-for="session in getSessionsByModuleId(module.id)" v-bind:key="session.id">
            <v-card
              class="elevation-20"
              max-width="500"
              height='100%'
            >
    <v-card-text>
      <p class="display-1 text--primary">
        {{session.name}}
      </p>
    </v-card-text>
  </v-card>
          </v-col>
      </v-row>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {

  name: 'ModulesPage',

  data: () => ({
  }),
  methods: {
    ...mapActions('modules', ['fetchModules']),
    ...mapActions('sessions', ['fetchSessionsForModule']),
    ...mapActions('exercises', ['fetchExercisesForSession']),

    moreInfoModule (mId) {
      this.$router.push({ name: 'module', params: { id: mId } })
    }
  },
  async mounted () {
    await this.fetchModules()
    await Promise.all(this.modules.map(m => this.fetchSessionsForModule({ moduleId: m.id })))
    await Promise.all(this.sessions.map(s => this.fetchExercisesForSession({ sessionId: s.id })))
  },
  computed: {
    ...mapState('modules', ['modules']),
    ...mapState('sessions', ['sessions']),
    ...mapState('exercises', ['exercises']),
    ...mapGetters('sessions', ['getSessionsByModuleId'])
  }
}

</script>

<style>
</style>
