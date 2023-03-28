<template>
  <DataTable
    v-if="users.length > 0"
    :value="users"
    :paginator="true"
    :rows="10"
    dataKey="id" 
    stripedRows
    showGridlines
    responsiveLayout="scroll"
    class="pt-4"
  >
    <Column :expander="true" headerStyle="width: 3rem" />
    <Column field="id" header="ID" :sortable="true"></Column>
    <Column field="email" header="Email"></Column>
    <Column field="access_level" header="Права"></Column>
    <Column field="ts" header="Дата регистрации"></Column>
  </DataTable>
</template>

<script lang="ts" setup>
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  const users = ref(await $fetch('/api/v1/users', {method: 'GET'}));
</script>