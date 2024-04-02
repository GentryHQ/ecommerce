<template>
    <div class="hero">
        <div class="hero_container">
            <div class="hero_col">
                <h3>Trendy Collections</h3>
                <h1>Switch Up Your Clothing</h1>
                <p>Lorem ipsum dolor sit consectetur adipisicing elit. Quis assumenda suscipit quod magni exercitationem sit id ratione tempore sed illum veniam aliquam aperiam, inventore</p>
                <router-link :to="{name: 'shop'}">Shop Now</router-link>
            </div>
        </div>
    </div>
    
   
</template>

<script>

export default {
    data() {
        return {
            slides: [
                { title: 'This is a 1 Title', desc: 'lorem add skid', img: './src/assets/images/clothes1.webp' },
                { title: 'This is a 2 Title', desc: '2   2lorem add skid', img: './src/assets/images/Female_Fashion.webp' },
                { title: '3 This is a Title', desc: '3  3 lorem add skid', img: './src/assets/images/Shop_with_us.webp' }
            ]
        }
    },

    methods: {
        prevSlide () {
            console.log('works');
        },

        nextSlide () {
            console.log('next');
        }
    }

}
</script>

<style lang="scss" scoped>
@use '../assets/css/variables' as v;
@use '../assets/css/mixins' as m;

.hero_container {
    background-image: url('../assets/images/ba1.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    // background-position: center center;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 600px;
    color: v.$white;
    position: relative;
    z-index: 1;

    &::after {
        content: '';
        width: 100%;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: -1;
    }
}

.hero_col {
    text-align: center;
    h1 {
        font-weight: v.$fw-700;
        font-size: 2.5rem;
        margin-block-start: 20px;
    }

    h3 {
        font-weight: v.$fw-400;
    }

    p {
        max-width: 34.375rem;
        margin-block: 20px;
        font-size: 18px;
        margin-inline: auto;
    }

    a {
        @include m.btn;
    }
} 
</style>