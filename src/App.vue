<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <img class="bg-red-900" alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" />
  <div class="content">
    <img src="./assets/logo.png" alt="" />
    <div class="text">
      <p>
        "asdsadasd" asdasdas asd asd as dasd a sda dsasd a sda sda da dasd qw
        eqweq cdsv sdf er tr g fgdf gdf ddv dfg erteg efdd d g rt
      </p>
      <a href="">link</a>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: #2c3e50;
}
.content {
  width: 800px;
  border: 4px solid #fff;
  margin: auto;
  margin-block: 20px;
  img {
    display: inline-block;
    width: 200px;
  }
  .text {
    display: inline-block;
    width: 580px;
    color: #fff;
    vertical-align: top;
    text-align: left;
  }
}
@media screen and (max-width: 700px) {
  .content {
    width: auto;
    .img {
      border-radius: 50%;
      display: block;
    }
    .text {
      text-align: center;
      width: auto;
    }
  }
}
</style>
