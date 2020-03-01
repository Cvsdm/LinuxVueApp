<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" md="6">
        <h1 class="display-2 font-weight-bold mb-3">Exercise Page</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-flex xs6>
        <v-form>
          <v-btn color="success" class="mr-4" @click="saving">Save this Exercise</v-btn>
        </v-form>
        <h3>Instructions</h3>
        <v-textarea filled v-model="instructions" auto-grow></v-textarea>
      </v-flex>
      <v-col cols="12" md="6">
        <h3>Tests</h3>
        <div label="Test" id="editorTest" class="exercise-editor-ace-editor" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <h3>Template of solution</h3>
        <div id="editorTemplate" class="exercise-editor-ace-editor" />
      </v-col>
      <v-col cols="12" md="6">
        <h3>Sandbox</h3>
        <div id="editorSandbox" class="exercise-editor-ace-editor" />
        <v-form>
          <v-btn color="success" class="mr-4" @click="run">Run Code</v-btn>
        </v-form>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <h3>Console Output</h3>
        <p class="text-justify display"> {{this.console}}
        </p>
         </v-col>
      <v-col cols="12" md="6">
        <h3>Tests Results</h3>
         <p class="text-justify display"> {{this.tests}}
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ace from 'ace-builds/src-noconflict/ace'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/webpack-resolver'

export default {
  name: 'ExercisePage',

  data: () => ({
    instructions: '',
    console: '',
    tests: '',
    editorTest: null,
    editorTemplate: null,
    editorSandbox: null
  }),
  methods: {
    async saving () {
      console.log('i saved')
      const { instructions, editorTest, editorSandbox } = this

      try {
        const result = await this.axios.post(
          'http://localhost:3000/api/v1/exercise',
          {
            instructions,
            lang: 'python',
            tests: editorTest.getValue(),
            solution: editorSandbox.getValue(),
            template_regions: ['France'],
            template_regions_rw: [0],
            difficulty: 1,
            score: 50
          }
        )
        console.log('result' + JSON.stringify(result))
      } catch (err) {
        console.log('error')
        this.errorLogin = err
      }
    },
    async run () {
      console.log('i ran')
      const { editorTest, editorSandbox } = this
      try {
        const result = await this.axios.post(
          'http://localhost:3000/api/v1/exercise/sandbox',
          {
            lang: 'python',
            tests: editorTest.getValue(),
            solution: editorSandbox.getValue()
          }
        )
        this.console = result.stdout
        this.tests = result.tests
      } catch (err) {
        console.log('error')
        this.errorLogin = err
      }
    }
  },
  mounted () {
    this.editorTest = ace.edit('editorTest')
    this.editorTest.setTheme('ace/theme/monokai')
    this.editorTest.session.setMode(`ace/mode/${this.lang}`)

    this.editorSandbox = ace.edit('editorSandbox')
    this.editorSandbox.setTheme('ace/theme/monokai')
    this.editorSandbox.session.setMode(`ace/mode/${this.lang}`)

    this.editorTemplate = ace.edit('editorTemplate')
    this.editorTemplate.setTheme('ace/theme/monokai')
    this.editorTemplate.session.setMode(`ace/mode/${this.lang}`)
  }
}

</script>

<style>
.exercise-editor-ace-editor {
  position: relative;
  height: 20rem;
}

.display{
  background-color: rgb(49, 48, 48);
  position: relative;
  height: 20rem;
}
</style>
