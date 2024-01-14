<template>
    <div class="quiz-body">
        <div class="quiz-body__carts">
            <div class="quiz-body__cart" v-for="question in questions" :key="question.id">
                <div class="title-cart">{{ question.title }}</div>

                <div class="quiz-body__answers">
                    <QuizRadioContainer 
                        :answers="question" 
                        :show-answers="showCorrectResult"
                        @result="compareAnswers"
                    />
                </div>
            </div>
        </div>

        <div class="quiz-body__btn">
            <vs-button
                dark
                flat
                size="xl"
                :disabled="isActive"
                @click="checkAnswers"
            >
                Done
            </vs-button>
        </div>

        <QuizModal 
            :open-modal="openModal" 
            :description="description"
            @show_result="showResult"
        />
    </div>
</template>

<script>
import QuizRadioContainer from './QuizRadioContainer.vue'
import OriginQuestions from '../../questions.js'
import QuizModal from "../../components/QuizPageComponents/Modal/QuizModal"
import textForModal from "../../textForModal"

export default{
    name: "QuizBody",

    components: {
        QuizRadioContainer,
        QuizModal
    },

    data() {
        return {
            questions: [],
            questionsList: [],
            isActive: true,
            activeModal: false,
            openModal: false,
            procentOfResult: 0,
            description: {},
            showCorrectResult: false
        }
    },

    mounted(){
        this.questions = OriginQuestions
    },

    methods: {
        compareAnswers(val){ 
            this.questions[val.id].isTrue = val.isTrue 

            if (this.questionsList.indexOf(val.id) === -1){
                this.questionsList.push(val.id)
            }
            
            this.isActive = this.questionsList.length <= 2
            this.procentOfResult = this.questions.filter(el => el.isTrue).length
        },

        checkAnswers(){
            this.openModal = true
            this.description = textForModal[this.procentOfResult]

            setTimeout(() => {
                this.openModal = false
            }, 0)
        },

        showResult(){
            this.showCorrectResult = true
        }
    }
}
</script>

<style scoped lang="scss">
    .title-cart{
        font-family: revert-layer;
        font-size: 30px;
        margin-bottom: 20px;
    }

    .quiz-body{
        &__cart{
            margin-bottom: 30px;
        }

        &__btn{
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>