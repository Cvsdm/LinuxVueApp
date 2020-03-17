 <template>
  <v-container>
     <v-col>
        <v-row v-for="exercise in dispExercises" :key="exercise.id">
        <v-card
          class="mx-auto"
          width="180px"
          height="100%"
          @click="goExercise(exercise.id)"
        >
          <v-system-bar v-if="exercise.valid!=null" color="#0aa612" height="100%">
            <v-card-text>
              <p>{{exercise.title}}</p>
            </v-card-text>
          </v-system-bar>
          <v-system-bar v-else color="#687178" height="100%">
            <v-card-text>
              <p>{{exercise.title}}</p>
            </v-card-text>
          </v-system-bar>
        </v-card>
        </v-row>
      </v-col>
        </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ExercisePage',
  data: () => ({
    dispExercises: []
  }),
  methods: {
    ...mapActions('modules', ['fetchModule']),
    ...mapActions('sessions', ['fetchSessionsForModule', 'fetchSession']),
    ...mapActions('exercises', ['fetchExercisesForSession']),

    goExercise (eID) {
      this.$router.push({ name: 'StudentExercise', params: { mId: this.$route.params.mId, sId: this.$route.params.sId, eId: eID } })
    }
  },
  async mounted () {
    await this.fetchSession({ id: this.$route.params.sId })
    await this.fetchExercisesForSession({ sessionId: this.$route.params.sId })
    this.dispExercises = this.getExercisesBySessionId(this.$route.params.sId)
  },
  computed: {
    ...mapGetters('exercises', ['getExercisesBySessionId'])
  }
}
</script>
