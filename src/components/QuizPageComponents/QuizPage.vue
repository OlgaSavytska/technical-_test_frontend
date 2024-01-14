<template>
    <div>
        <v-expand-x-transition>
            <div class="page" v-show="openQuiz">
                <div class="container" >
                    <QuizHeader/>

                    <div class="image" >
                        <div class="start_title" id="start_title">Start!</div>
                        <div class="stars" id="stars"></div>
                        <div class="mountains_back" id="mountains_back"></div>
                        <div class="mountains_front" id="mountains_front"></div>
                    </div>
                    <QuizBody/>
                </div>
            </div>
        </v-expand-x-transition>
    </div>
</template>

<script>
import QuizHeader from './QuizHeader.vue'
import QuizBody from './QuizBody.vue'

export default{
    name: "QuizPage",

    components: {
        QuizHeader,
        QuizBody
    },

    data(){
        return {
            openQuiz: false
        }
    },

    mounted(){
        window.addEventListener("scroll", this.scrollCart)
        this.scrollCart()
        
        setTimeout(() => {
            this.openQuiz = true
        }, 2000)
    },

    beforeDestroy(){
        window.removeEventListener("scroll", this.scrollCart)
    },

    methods: {
        scrollCart(){
            let mountains_back = document.getElementById("mountains_back")
            let mountains_front = document.getElementById("mountains_front")
            let start_title = document.getElementById("start_title");

            let value = window.scrollY
            let titleValue = window.scrollY + 200

            mountains_back.style.top = value * 0.5 + "px";
            start_title.style.top = titleValue * 1 + "px";
            mountains_front.style.top = value * 0 + "px";
        }
    }
}
</script>

<style scoped lang="scss">
    .page{
        position: absolute;
        top: 18%;
        z-index: 10;
        background: rgba(255,255,255, 0.5);
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        padding: 10px 25px;

        .container{
            background: rgba(255,255,255, 1); 
            padding: 10px 25px;
        }
    }

    .image{
        height: 500px;
        border: 1px red solid;
        overflow: hidden;
        perspective: 1000px; 
        background-color: #03031e;
        position: relative;
        margin-bottom: 20px;

        .stars{
            background: url('https://raw.githubusercontent.com/Ryoley/moonlight-parallax/main/assets/images/stars.png');
            background-size: cover;
            height: 100%;            
        }

        .mountains_back{
            background: url('https://raw.githubusercontent.com/Ryoley/moonlight-parallax/main/assets/images/mountains_back.png');
            background-size: cover;
            height: 100%;
        }

        .mountains_front{
            background: url('https://raw.githubusercontent.com/Ryoley/moonlight-parallax/main/assets/images/mountains_front.png');
            background-size: cover;
            height: 100%;
        }

        .stars,
        .mountains_back,
        .mountains_front {
            width: 100%;
            height: 100%;
            background-size: cover;
            background-repeat: no-repeat;
            position: absolute;
        }
    }

    .start_title{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        padding: 30px 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        color: white;
        font-size: 130px;
        font-weight: 600;
    }

    @media(max-width: 525px){
        .start_title{
            font-size: 90px;
            font-weight: 600;  
        }
    }

    @media(max-width: 380px){
        .page{
            top: 30%;
        }
    }
</style>