<template>
    <div class="vs-checkbox-container">
        <vs-radio 
            dark 
            v-for="(answer, index) in answerResult.answers" 
            :key="index" 
            :val="index" 
            :class="{'correct-answer': index === answerResult.resultAnswer && showAnswers}"
            v-model="result"
        >
            {{ answer.name }}
        </vs-radio>
    </div>
</template>

<script>
export default{
    name: "QuizRadioContainer",

    props: {
        answers: {
            type: Object,
            default: () => {}
        },

        showAnswers: {
            type: Boolean,
            default: false
        }
    },

    data(){
        return{
            answerResult: [],
            result: null,
            isCorrect: false
        }
    },

    mounted(){
        this.answerResult = {...this.answers}
    },

    watch:{
        result(val){
            if (typeof val === "number"){
                this.answerResult.isTrue = this.answerResult.resultAnswer === val
                this.$emit('result', this.answerResult)
            }
        },

        showAnswers(){
            this.isCorrect = this.answerResult.resultAnswer === this.result
        }
    }
}
</script>

<style lang="scss">
    .vs-checkbox .vs-icon-check span .line1 {
        width: 5px !important;
    }

    .vs-radio-content{
        justify-content: flex-start !important;

        label{
            text-align: start;
        }
    }

    .correct-answer{
        background: green;
        color: white;
        width: max-content;
        border-radius: 20px;
    }

    .vs-radio-content{
        padding: 5px;
    } 
</style>