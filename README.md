# VueJsIdle

**VueJsIdle** is a plugins to detect idle or inactive users.


## Installation

This plugin can be installed by **npm** or **yarn**. 

### NPM

```bash
npm i vuejs-idle --save
```

### Yarn

```bash
yarn add vuejs-idle
```

## Basic usage

### Vue.js

```javascript
import { createApp } from "vue";
import VueJsIdle from 'vuejs-idle'

const app = createApp(App);
app.use(VueJsIdle);

app.mount("#app");
```

## Component

Inside template use **VueJsIdle** component:

```html
<VueJsIdle />
```

It will show timer counting down from 05:00 by default.

## Options

### @idle

Type: Function

Default: none

Executes when the timer reaches 00:00

```html
<VueJsIdle @idle="onidle" />
```

### @active

Type: Function

Default: none

Executes when the timer reaches 00:00 and any events is occurred.

```html
<VueJsIdle @active="active" />
```

### @prompt

Type: Function

Default: none

Executes when the timer reaches time in seconds before 00:00

```html
<VueJsIdle
  @prompt="onprompt"
  :prompter_schedule="[5, 10, 20, 60]" />
```

### prompter_schedule

Type: Array

Default: empty array

Array with seconds. Each value will execute @prompt

### loop

Type: Boolean

Default: false

If set to true, timer will start execution again after 00:00

```html
<VueJsIdle :loop="true" />
```

### events

Type: Array

Default: ["mousemove", "keypress", "click", "scroll"]

Each event will break countdown.

```html
<VueJsIdle :events="['mousemove', 'keypress', 'click', 'scroll']" />
```

### wait

Type: Number

Default: 0

How many second to wait before starting countdown.

```html
<VueJsIdle :wait="1" />
```

### duration

Type: Number

Default: 300

Should be in seconds, default value is 300 seconds, so 5 minutes.

```html
<VueJsIdle :duration="300" />
```

### showTime

Type: Boolean

Default: true

If set to true, shows timer else hides' timer.

```html
<VueJsIdle :showTime="true" />
```

## Example

Create a timer for 300 seconds (5 minutes) with loop, remind 60 and 120 seconds before **00:00** with function `onprompt()`, wait 1 seconds before showing user the timer, execute function `onidle()` when the timer reaches **00:00**.

```html
<script setup>
import VueJsIdle from "@/components/VueJsIdle";
</script>

<template>
  <VueJsIdle
    :duration="300"
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

```

## Tests

To run tests type:
```bash
npm run test:unit
```

## License
MIT License (MIT). 

Please see the [license file](https://github.com/shafikshaon/vuejs-idle/blob/main/LICENSE) for more information.
