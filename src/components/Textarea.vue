<template>
    <div class="w-full focus-within:text-blue-600 text-gray-800 my-1.5 md:my-1">
      <label v-if="!hideLabel" class="focus-within:font-semibold text-sm " :for="name">{{label}}</label>
      <div :class="`${err ? 'border-red-500':''} border focus-within:text-blue-600 mt-1 focus-within:border-2 focus-within:border-blue-600 transition-all duration-300 h-28 px-2 rounded`">
            <textarea onchange="onChange" :name="name" class="w-full h-full outline-none resize-none" :placeholder="placeholder"></textarea>
      </div>
      <span class="text-red-500 mt-0.5 text-[11px]" v-if="err">{{err}}</span>
    </div>
  </template>
  
  <script>
  export default {
    props: {
          hideLabel:false,
          name: String,
          placeholder: String,
          model: String,
          value: String,
          evt: String,
          onChange: Function,
          label: String,
          err: String,
      },
  
  }
  </script>