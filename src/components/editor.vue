<template>
  <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <h3>Sandbox</h3>
          <div id="editor" class="exercise-editor-ace-editor" />
          <v-btn color="success" class="mr-4" @click="run">Run Code</v-btn>
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
  name: 'Editor',

  data: () => ({
    editor: null
  }),
  methods: {
    async run () {
      const { editor } = this
      try {
        await this.axios.post('http://localhost:3000/api/v1/exercise/sandbox', {
          lang: 'python',
          solution: editor.getValue()
        })
      } catch (err) {
        console.log('error')
      }
    }
  },
  mounted () {
    this.editor = ace.edit('editor')
    this.editor.setTheme('ace/theme/monokai')
    this.editor.session.setMode(`ace/mode/${this.lang}`)
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
