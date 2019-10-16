<template>
    <div class="lds-dual-ring"></div>
</template>

<script>
    export default {
        name: "Loader"
    }
</script>

<style scoped>
    .lds-dual-ring {
        display: block;
        width: 64px;
        height: 64px;
        margin-left: auto;
        margin-right: auto;
    }
    .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 46px;
        height: 46px;
        margin: 1px;
        border-radius: 50%;
        border: 5px solid darkblue;
        border-color: darkblue transparent darkblue transparent;
        animation: lds-dual-ring 1.2s linear infinite;
    }
    @keyframes lds-dual-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>