<template>
  <div class="module">
  <ModulePage/>
  </div>
</template>

<script>
// @ is an alias to /src
import ModulePage from '@/components/ModulePage.vue'

export default {
  name: 'Module',
  components: {
    ModulePage
  }
}
</script>
