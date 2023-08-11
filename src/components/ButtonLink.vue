<template>
<router-link :to="path">
    <a v-if="variant === 'default'" class="font-semibold text-blue-700" >
      {{text}}
    </a>
    <a v-else-if="variant === 'green'" class="font-semibold text-green-500" >
      {{text}}
    </a>
</router-link>
</template>

<script>
export default {
    props: {
        text: String,
        path: String,
        variant: String
    }
}
</script>