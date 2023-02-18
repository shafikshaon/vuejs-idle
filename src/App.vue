<script setup>
import VueJsIdle from "@/components/VueJsIdle";</script>

<template>
  <VueJsIdle
    :duration="10"
    :prompter_schedule="[60, 120]"
    :wait="1"
    :loop="false"
    @active="active"
    @idle="onidle"
    @prompt="onprompt"
    :show-time="true"
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
    },
    active() {
      console.log('active')
    }
  }
}
</script>

<style scoped>

</style>
