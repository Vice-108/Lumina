<template>
  <div class="flex justify-center items-center h-screen space-x-8">
    <SignIn />
    <SignUp />
    <RouterView />
  </div>
</template>
<script setup lang="ts">
import SignIn from '@/components/SignIn.vue'
import SignUp from '@/components/SignUp.vue'
import { RouterView } from 'vue-router'
</script>
