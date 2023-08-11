<template>
    <div class="w-full focus-within:text-blue-600 text-gray-800 my-1.5 md:my-1`">
        <div :class="`${err ? 'border-red-500':''} border justify-between focus-within:text-blue-600 mt-1 focus-within:border-2 focus-within:border-blue-600 transition-all flex items-center duration-300 h-10 px-2 rounded`">
            <label  class="focus-within:font-semibold " :for="name">{{label}}</label>
        <input  :value="value" @input="event" autocomplete  class="w-1/2  h-full outline-none"  type="date" :name="name" :id="name"/>
    </div>
    <span class="text-red-500 mt-0.5 text-[11px]" v-if="err">{{err}}</span>
</div>
</template>
<script>
export default {
    props: {
        event: Function,
        name: String,
        label: String,
        err: String,
        value: String
    },
    setup({ event, name, label }) {
        
        return {event, name, label}
    }
}
</script>