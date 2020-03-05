<template>
  <div class="modules">
  <ModulesPage/>
  </div>
</template>

<script>
// @ is an alias to /src
import ModulesPage from '@/components/ModulesPage.vue'

export default {
  name: 'Modules',
  components: {
    ModulesPage
  }
}
</script>
