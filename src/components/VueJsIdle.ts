import type { PropType } from "vue";
import { defineComponent, h } from "vue";

const VueJsIdle = defineComponent({
  beforeUnmount() {
    clearInterval(this.timer);
    clearInterval(this.counter);
    for (let i = this.triggerEvents.length - 1; i >= 0; i -= 1) {
      window.removeEventListener(this.triggerEvents[i], this.clearTimer);
    }
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
  emits: ["idle", "prompt", "active"],
  methods: {
    setDisplay() {
      // seconds since start
      this.time_difference = this.duration - (((Date.now() - this.start) / 1000) | 0);
      if (this.time_difference < 0 && !this.loop) {
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
    countdown: function () {
      this.setDisplay();

      if (this.time_difference <= 0) {
        this.clearTimer(undefined, this.loop);
      }
    },
    idle() {
      this.$emit("idle");
    },
    active() {
      this.$emit("active");
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
      this.active();
      if (loop) {
        this.start = Date.now();
        this.time_difference = 0;
        this.setDisplay();
        this.setTimer();
      }
    },
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
  props: {
    duration: {
      type: Number,
      // default 300 seconds
      default: 300,
    },
    triggerEvents: {
      type: Array as PropType<(keyof WindowEventMap)[]>,
      default: () => ["mousemove", "keypress", "click", "scroll"],
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
    showTime: {
      type: Boolean,
      default: true,
    },
    loop: {
      type: Boolean,
      default: false,
    },
  },
  render() {
    return h(
      "div",
      [this.showTime ? h('span', this.display) : h('span', '')],
    );
  },
});


export default VueJsIdle;
