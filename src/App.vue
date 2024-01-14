<template>
  <div id="app">
    <StartPage/>
    <QuizPage v-if="false"/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import StartPage from './components/StartPage.vue'
import QuizPage from './components/QuizPageComponents/QuizPage.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
    StartPage,
    QuizPage
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Gluten&display=swap');

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /* margin-top: 60px; */
  }

  body{
    margin: 0px;
  }
</style>
