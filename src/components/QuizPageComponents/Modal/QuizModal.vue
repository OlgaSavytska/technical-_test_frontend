<template>
    <div class="quiz-modal">
        <vs-dialog width="550px" not-center v-model="open">
          <template #header>
            <h4 class="not-margin">
              {{description.title}}
            </h4>
          </template>


          <div class="con-content">
            <p>
              {{description.text}}
            </p>
          </div>

          <template #footer>
            <div class="con-footer">
              <vs-button @click="showCorrectAnswers" transparent>
                Show the correct answers
              </vs-button>
              <vs-button @click="open=false" dark transparent>
                Cancel
              </vs-button>
            </div>
          </template>
      </vs-dialog>
    </div>
</template>

<script>
export default{
    name: "QuizModal",

    props: {
      openModal: {
        type: Boolean,
        default: false
      },

      description: {
        type: Object,
        default: () => {}
      }
    },

    data(){
      return{
        open: false
      }
    },

    watch: {
      openModal(val){
        if (val){
          this.open = val
        }
      }
    },

    methods: {
      showCorrectAnswers(){
        this.$emit('show_result')
        this.open = false
      }
    }
}
</script>

<style lang="scss">
.vs-dialog-content{
  .con-footer{
    display: flex;
    justify-content: flex-end;
  }
}

</style>