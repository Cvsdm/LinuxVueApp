<template>
  <v-container>
    <v-row class="text-center">
      <v-col>
        <h1 class="display-2 font-weight-bold mb-3">Login Page</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-form v-model="valid">
        <v-container>
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

            <v-text-field
              v-model="password"
              :rules="passwordRules"
              :counter="10"
              label="Password"
              required
            ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="loginAction"
           >
            Validate
          </v-btn>
        </v-container>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'LoginForm',

  data: () => ({
    valid: false,
    password: 'cLvnWjT1Ht',
    passwordRules: [
      v => !!v || 'Password is required',
      v => v.length <= 10 || 'Password must be less than 10 characters'
    ],
    email: 'admin@example.com',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ]
  }),
  methods: {
    ...mapActions('user', ['login']),

    async loginAction () {
      const { email, password } = this

      await this.login({ email, password })
      if (this.isAuthenticated) {
        this.$router.push({ name: 'modules' })
      } else {
        console.log('error')
      }
    }
  },
  computed: {
    ...mapGetters('user', ['isAuthenticated'])
  }

}
</script>
