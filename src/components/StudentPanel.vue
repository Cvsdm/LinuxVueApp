<template>
  <v-container>

<v-row>
  <v-col class="d-flex" cols="12" sm="6">
        <h3>{{this.exercise.title}}</h3>
        <p>{{this.exercise}}</p>
        </v-col>
      <v-col cols="12" md="6">
        <h3>Tests</h3>
        <div label="Test" id="editorTest" class="exercise-editor-ace-editor" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <h3>Sandbox</h3>
        <div id="editorSandbox" class="exercise-editor-ace-editor" />
          <v-btn color="success" class="mr-4" @click="run">Run Code</v-btn>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>

import { mapActions, mapState } from 'vuex'

import ace from 'ace-builds/src-noconflict/ace'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/webpack-resolver'

export default {
  name: 'ExercisePage',

  data: () => ({
    editorSandbox: null,
    exercise: null
  }),
  methods: {
    ...mapActions('modules', ['fetchModule']),
    ...mapActions('sessions', ['fetchSessionsForModule', 'fetchSession']),
    ...mapActions('exercises', ['fetchExercisesForSession', 'getExerciseById']),

    async run () {
      const { editorSandbox } = this
      try {
        await this.axios.post(
          'http://localhost:3000/api/v1/exercise/sandbox',
          {
            lang: 'python',
            solution: editorSandbox.getValue()
          }
        )
      } catch (err) {
        console.log('error')
      }
    }
  },
  async mounted () {
    console.log('mid ' + this.$route.params.mId + '  sid ' + this.$route.params.sId)
    await this.fetchModule({ id: this.$route.params.mId })
    await this.fetchSession({ id: this.$route.params.sId })
    await this.fetchExercisesForSession({ sessionId: this.$route.params.sId })
    this.exercise = await this.getExerciseById({ id: this.$route.params.eId })

    this.editorSandbox = ace.edit('editorSandbox')
    this.editorSandbox.setTheme('ace/theme/monokai')
    this.editorSandbox.session.setMode(`ace/mode/${this.lang}`)
  },
  computed: {
    ...mapState('modules', ['modules']),
    ...mapState('sessions', ['sessions']),
    ...mapState('exercises', ['exercises'])
  }
}

</script>
<style>
.exercise-editor-ace-editor {
  position: relative;
  height: 20rem;
}

.display{
  position: relative;
  height: 20rem;
}
</style>
