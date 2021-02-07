<template>
    <div>
        <div v-for="(error, index) in errors" :key="index" class="text-danger">
          {{ error }}
        </div>
    </div>
  
</template>

<script>
export default {
    props: ['errors']
}
</script>

<style>

</style>