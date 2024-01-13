<script setup lang="ts">

import { useUsers } from "./store";

const { data, isLoading } = useUsers();

</script>

<template>
  <div>
    <div v-if="isLoading">loading...</div>
    <div v-else v-for="user in data">
      {{ user.name }}
    </div>
  </div>
</template>
