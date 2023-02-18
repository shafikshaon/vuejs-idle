import { defineComponent, h, PropType } from "vue";

const VueJsIdle = defineComponent({
  render() {
    return h(
      "div",
      {
        class: "vuejs-idle",
      },
      this.display
    );
  },
  emits: ["idle", "prompt"],
  props: {
    duration: {
      type: Number,
      // default 300 seconds
      default: 300,
    },
    triggerEvents: {
      type: Array as PropType<(keyof WindowEventMap)[]>,
      default: () => ["mousemove", "keypress"],
    },
    prompter_schedule: {
      type: Array as PropType<number[]>,
      // array of seconds
      // emit "prompt" event on each second
      default: (): number[] => [60],
    },
    wait: {
      type: Number,
      default: 0,
    },
  },
  data(): {
    display: string;
    timer: number | undefined;
    start: number;
    counter: number | undefined;
    time_difference: number;
    minutes: string;
    seconds: string;
  } {
    return {
      display: "",
      timer: undefined,
      start: 0,
      counter: undefined,
      time_difference: 0,
      minutes: "",
      seconds: "",
    };
  },
  mounted() {
    setTimeout(() => {
      this.start = Date.now();
      this.setDisplay();
      this.$nextTick(() => {
        this.setTimer();
        for (let i = this.triggerEvents.length - 1; i >= 0; i -= 1) {
          window.addEventListener(this.triggerEvents[i], this.clearTimer);
        }
      });
    }, this.wait * 1000);
  },
  methods: {
    setDisplay() {
      // seconds since start
      this.time_difference = this.duration - (((Date.now() - this.start) / 1000) | 0);
      if (this.time_difference < 0) {
        return;
      }
      this.shouldRemind();

      // bitwise OR to handle parseInt
      const minute = (this.time_difference / 60) | 0;
      const second = this.time_difference % 60 | 0;

      this.minutes = `${ minute < 10 ? "0" + minute : minute }`;
      this.seconds = `${ second < 10 ? "0" + second : second }`;

      this.display = `${ this.minutes }:${ this.seconds }`;
    },
    shouldRemind() {
      if (this.prompter_schedule.length > 0) {
        if (this.prompter_schedule.includes(this.time_difference)) {
          this.prompt();
        }
      }
    },
    countdown() {
      this.setDisplay();

      if (this.time_difference <= 0) {
        this.clearTimer(undefined, false);
      }
    },
    idle() {
      this.$emit("idle");
    },
    prompt() {
      this.$emit("prompt", this.time_difference);
    },
    setTimer() {
      this.timer = window.setInterval(this.idle, this.duration * 1000);
      this.counter = window.setInterval(this.countdown, 1000);
    },
    clearTimer(event?: Event, loop = true) {
      window.clearInterval(this.timer);
      window.clearInterval(this.counter);
      this.start = Date.now();
      this.time_difference = 0;
      this.setDisplay();
      this.setTimer();
    },
  },
  beforeUnmount() {
    clearInterval(this.timer);
    clearInterval(this.counter);
    for (let i = this.triggerEvents.length - 1; i >= 0; i -= 1) {
      window.removeEventListener(this.triggerEvents[i], this.clearTimer);
    }
  },
});

export default VueJsIdle;
