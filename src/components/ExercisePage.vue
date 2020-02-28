<template>
  <v-container>
    <v-row class="text-center">
      <v-col>
        <h1 class="display-2 font-weight-bold mb-3">Exercise Page</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-textarea
        v-model="instructions"
        auto-grow
        label="Instructions"
        rows="1"
      ></v-textarea>
    </v-row>
    <v-row>
      <v-form v-model="save">
          <v-btn
        :disabled="!save"
        color="success"
        class="mr-4"
        @click="saving"
      >
        Save
      </v-btn>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ExercisePage',

  data: () => ({
    instructions: '',
    save: false
  }),
  methods: {
    async saving () {
      console.log('i saved')
      const { instructions, tests, sandbox } = this
      try {
        const result = await this.axios.post('http://localhost:3000/api/v1/exercise', {
          instructions,
          lang: 'python',
          tests,
          solution: sandbox,
          template_regions: ['France'],
          template_regions_rw: [1],
          difficulty: 1,
          score: 50
        })
        console.log('result' + JSON.stringify(result))
        // this.$router.push({ name: 'home' })
      } catch (err) {
        console.log('error')
        this.errorLogin = err
      }
    }
  }
}
</script>
