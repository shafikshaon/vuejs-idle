<script setup>
import VueJsIdle from "@/components/VueJsIdle";</script>

<template>
  <VueJsIdle
    :duration="300"
    :prompter_schedule="[60, 120]"
    :wait="1"
    @idle="onidle"
    @prompt="onprompt"
  />
</template>


<script>

export default {
  methods: {
    onidle() {
      console.log('Idle timeout.');
    },
    onprompt(time) {
      console.log(time);
    }
  }
}
</script>

<style scoped>

</style>
