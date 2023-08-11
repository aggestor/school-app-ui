<template>
  
</template>

<script>
import user from '../api/user'
import { useLogout } from '../helpers/logout'
export default {
    mounted() {
       this.getUser()
    },
    methods: {
        async getUser() {
             const result = await user.profile()
             useLogout(result).then(value => {
                value === "success" && this.$router.push('/login')
            })
        }
    }
}

</script>

<style>

</style>