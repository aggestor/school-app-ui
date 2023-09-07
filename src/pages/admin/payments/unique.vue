<template>
    <div class="w-9/12 rounded mx-auto mt-5 border p-3 h-auto">
        <div class="w-full">
            <div>
                <b>Noms</b>
                <p class="text-gray-600">Kambale Mahili Aggee</p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRoute } from 'vue-router';
import Payment from '../../../api/v2/Payment';
import useFetch from '../../../hooks/useFetch';
    const route = useRoute()
    const {data,loading} = useFetch(Payment.getOne(route.params.id))
</script>