<template>
  <v-container>
      <v-row>
        <v-col>
          <h3>Sandbox</h3>
          <div id="editor" class="exercise-editor-ace-editor" />
          <v-btn color="success" class="mr-4" @click="run">Run Code</v-btn>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import ace from 'ace-builds/src-noconflict/ace'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/webpack-resolver'

export default {
  name: 'Editor',
  props: {
    regions: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    editor: null,
    regions: []
  }),
  methods: {
    ...mapActions('attempts', ['createAttemptForSession']),
    async run () {
      console.log('value editor' + this.editor.getValue())
      await this.createAttemptForSession({ exerciseId: this.$route.params.eId, sessionId: this.$route.params.sId, regions: this.editor.getValue() })
    }
  },
  mounted () {
    this.editor = ace.edit('editor')
    this.editor.setTheme('ace/theme/monokai')
    this.editor.session.setMode('ace/mode/python')
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
