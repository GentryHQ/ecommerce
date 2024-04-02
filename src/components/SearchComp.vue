<template>
    <div class="searchBox">
        <form class="search_container">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" viewBox="0 0 512 512">
                <path fill="#ffffff"
                    d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6 .1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
            </svg>
            <input type="search" name="searchProduct" placeholder="...Search" v-model="searchQuery">
            <button @click.prevent="search">Search</button>
        </form>
    </div>
</template>

<script setup>
// import router from '@/router';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const searchQuery = ref('');

const router = useRouter();

const search = () => {
    if (searchQuery.value.trim().length > 0) {
        console.log(searchQuery.value);
        router.push({ name: 'SearchResult', query: { q: searchQuery.value } });
        console.log(searchQuery.value);

    }
}
</script>

<style lang="scss" scoped>
@use '../assets/css/variables' as v;
@use '../assets/css/mixins' as m;

.search_container {
    display: flex;
    gap: 1.25rem;
    width: min-content;
    background-color: v.$blue;
    padding: 8px 20px;
    border-radius: 12px;

    input {
        border: none;
        outline: none;
        background-color: transparent;
        color: v.$white;

        &::-webkit-search-cancel-button {
            color: v.$white;
        }

        &::placeholder {
            color: v.$white;
        }
    }

    button {
        @include m.btn;

        &:hover {
            background-color: v.$white;
            color: v.$blue;
        }
    }
}
</style>