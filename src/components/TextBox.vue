<template>
  <div class="w-full focus-within:text-blue-600 text-gray-800 my-1.5 md:my-1">
    <label v-if="!hideLabel" class="focus-within:font-semibold text-sm " :for="name">{{label}}</label>
    <div :class="`${err ? 'border-red-500':''} border focus-within:text-blue-600 mt-1 focus-within:border-2 focus-within:border-blue-600 transition-all duration-300 h-10 px-2 rounded`">
        <input v-if="type==='password'" :placeholder="placeholder" :value="value" @input="onChange" autocomplete  class="w-full h-full outline-none"  :type="type" :name="name" :id="name"/>
        <input v-else :value="value" :list="list" @input="onChange" :placeholder="placeholder"  class="w-full h-full text-sm outline-none"  :type="type" :name="name" :id="name+'_'"/>
          <datalist v-if="list" :id="list">
              <option v-for="item of items" :value="item.value">{{item.key}}</option>
          </datalist>
    </div>
    <span class="text-red-500 mt-0.5 text-[11px]" v-if="err">{{err[0]}}</span>
  </div>
</template>

<script>
export default {
  props: {
        hideLabel:false,
        name: String,
        placeholder: String,
        type: String,
        model: String,
        value: String,
        evt: String,
        onChange: Function,
        label: String,
        err: String,
        list: String,
        items:Array
    },

}
</script>