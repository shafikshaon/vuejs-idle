import { defineComponent, h } from "vue";

const VueJsIdle = defineComponent({
  render() {
    return h(
      "div",
      {
        class: "vuejs-idle",
      },
      this.display
    )
  },
  data: function (): {
    display: string
  } {
    return {
      display: "Hello!"
    }
  }
})

export default VueJsIdle;
