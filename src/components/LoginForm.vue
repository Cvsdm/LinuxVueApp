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
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
            </v-col>
          </v-row>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              :counter="10"
              label="Password"
              required
            ></v-text-field>
          </v-col>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="login"
           >
            Validate
          </v-btn>
        </v-container>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'LoginForm',

  data: () => ({
    valid: false,
    password: 'YPPCElTHfM',
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
    async login () {
      const { email, password } = this
      try {
        const result = await this.axios.post('http://localhost:3000/api/v1/login', {
          username: email,
          password
        })
        this.$root.user = result.data
        this.loggedIn = true
        this.$router.push({ name: 'home' })
      } catch (err) {
        console.log('error')
        this.errorLogin = err
      }
    }
  }
}
</script>
