<template>
    <div>
        <v-expand-transition>
            <div class="start-page__header-top" v-if="openHeaderCard">
                It's a Quiz Time!
            </div>
        </v-expand-transition>

        <QuizPage ref="page"/>
        
        <GeometryScene ref="quiz_scene" v-if="startScene" :page-params="pageParams"/>
    </div>
</template>

<script>
import GeometryScene from './QuizPageComponents/GeometryScene.vue'
import QuizPage from './QuizPageComponents/QuizPage.vue'

export default{
    name: "StartPage",

    components: {
        QuizPage,
        GeometryScene
    },

    data(){
        return{
            openHeaderCard: false,
            pageParams: 0,
            startScene: false
        }
    },

    mounted() {
        setTimeout(() => {
            this.openHeaderCard = true
        }, 1000)

        setTimeout(() => {
            if (window.innerWidth <= 380){
                this.openHeaderCard = false
            }
        }, 2000)

        setTimeout(() => {
            this.pageParams = this.$refs.page.$el.getBoundingClientRect().height / 1.5
            this.startScene = true
        }, 300)
        
        window.addEventListener('scroll', this.handleScroll)
    },

    beforeDestroy(){
        window.removeEventListener('scroll', this.handleScroll)
    },

    methods: {
        handleScroll(){
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercentage = (window.scrollY / totalHeight) * 100;
            this.openHeaderCard = window.innerWidth >= 380 ? scrollPercentage <= 1 : false
        }
    }
}
</script>

<style scoped lang="scss">
    .start-page{
        &__header-top{
            position: fixed;
            background-color: white;
            width: 100%;
            top: 0px;
            left: 0px;
            font-family: revert-layer;
            font-size: 60px;
        }

        &__btn{
            width: 100%;
            max-width: 300px;

            border-radius: 50%;
            background-color: transparent;
            border-color: transparent;

            transition: transform 0.5s ease;

            &-container{
                width: 100%;
                max-width: 300px;

                &:hover{
                    .start-page__btn{
                        transform: rotate(25deg) scale(1.2);
                    }
                }

                &.start-quiz{
                    transition: transform 10s ease;
                    transform: rotate(105deg) scale(50);
                }
            }
        }
    }
</style>