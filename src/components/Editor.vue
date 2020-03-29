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
    template_regions: {
      type: Array,
      required: true
    },
    template_regions_rw: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    editor: null
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

    console.log('template_regions' + this.template_regions)
    console.log('template_regions_rw' + this.template_regions_rw)

    // GET THE RW REGIONS
    const rw = this.template_regions_rw.indexOf(6)
    if (rw !== -1) {
      this.editor.setValue(this.template_regions[rw])
    }

    // GET THE RO REGIONS
    const ro = this.template_regions_rw.indexOf(4)
    if (ro !== -1) {
      this.editor.setValue(this.editor.getValue() + this.template_regions[ro])
    }

    // GET THE SOLUTION REGION
    const sol = this.template_regions_rw.indexOf(0)
    if (sol !== -1) {
      this.editor.setValue(this.editor.getValue() + this.template_regions[sol])
    }
  }
  /*
  lien vers le stackoverflow:
  https://stackoverflow.com/questions/39640328/how-to-make-multiple-chunk-of-lines-readonly-in-ace-editor */
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
