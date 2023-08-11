<template>
    <ReusableHeader title="Les marques" />
    <div class="w-full h-full grid place-items-center">
        <div class="w-[95%] rounded shadow flex flex-col pt-2 pb-4 px-4 h-auto py-6 bg-white">
            <div class="w-full sticky top-0 bg-white flex items-center justify-between h-14 mb-3 border-b border-gray-300">
                <h1 class="text-lg font-semibold text-gray-700 flex"> <span @click="goBack"
                        class="w-7 p-1 h-7 mr-1 md:mr-3 rounded-full hover:bg-blue-600 cursor-pointer bg-blue-500 text-white">
                        <ArrowLeftIcon class="w-full h-full" />
                    </span> <span class="mx-1">|</span>
                    <BarsArrowDownIcon class="h-7 hidden md:flex w-7 mr-2" /> Liste de marques
                </h1>
                <div class="w-[15%] flex items-center justify-between">
                    <span class="h-8 w-8 md:mr-2 p-1 m-1 rounded bg-gray-300 grid place-items-center">{{ total }}</span>
                    <router-link to="/admin/marks/create"><button
                            class="bg-blue-600 hover:bg-blue-700  hover:shadow-blue-300 hover:shadow-lg flex text-white duration-500 transition-colors rounded p-1  font-semibold">
                            <PlusCircleIcon class="h-6 w-6 md:mr-1" /><span class="hidden md:flex">Ajouter</span>
                        </button></router-link>
                </div>
            </div>
            <div class="w-full text-gray-700 mb-3 font-semibold flex justify-between border-b border-gray-300 p-2">
                <span class="w-1/12">#</span>
                <span class="md:w-3/12 w-5/12">Nom</span>
                <span class="w-2/12  overflow-hidden text-ellipsis">Modif.</span>
                <span class="w-1/12 text-center">---</span>
            </div>
            <div v-if="!loading && marks.length > 0" v-for="s,i of marks" class="flex flex-col">
                <div :key="s.mar_id"
                    :class="`w-full text-gray-700 text-sm mb-1.5 flex justify-between ${i % 2 == 0 ? 'bg-white' : 'bg-gray-100'} p-2`">
                    <span class="w-1/12">{{i + 1 }}</span>
                    <span class="md:w-3/12 w-5/12 font-semibold ">{{ s.mar_name }}</span>
                    <span class="w-2/12  overflow-hidden text-ellipsis">{{formatDateToAgo(s.last_update)}}</span>
                    <span class="w-1/12 flex justify-between">
                        <router-link :to="'/admin/marks/'+s.mar_id"><span class="w-6 hover:bg-slate-300 mr-2 cursor-pointer h-6  bg-gray-200 rounded grid place-items-center"><LinkIcon class="w-4 h-4"/></span></router-link>
                        <router-link :to="'/admin/marks/' + s.mar_id + '/' + prettyString(s.mar_name) + '/update'"><span class="w-6 h-6 bg-blue-600 rounded text-white grid place-items-center"><PencilIcon class="w-4 h-4" /></span></router-link>
                        </span>
                </div>
            </div>
            <div v-else-if="loading" class="flex animate-pulse flex-col">
                <div class="w-full mb-1.5  flex justify-between">
                    <span class="md:w-1/12 flex ">
                        <span class="bg-gray-200 rounded w-10 h-6"></span>
                    </span>
                    <span class="md:w-3/12 flex justify-start  w-4/12">
                        <span class="bg-gray-200 rounded md:w-40 w-16 h-6"></span>
                    </span>
                    <span class="w-3/12 hidden md:flex justify-start">
                        <span class="bg-gray-200 rounded md:w-40 w-16 h-6"></span>
                    </span>
                    <span class="md:w-3/12  flex w-2/12">
                        <span class="bg-gray-200 rounded w-20 h-6"></span>
                    </span>
                    <span class="md:w-2/12 flex w-1/12 ">
                        <span class="bg-gray-200 rounded w-12 h-6"></span>
                    </span>
                    <span class="md:w-1/12 w-1/12 flex justify-center">
                        <span class="w-6 h-6 bg-gray-200 rounded"></span>
                    </span>
                </div>
                <div class="w-full mb-1.5  flex justify-between">
                    <span class="md:w-1/12 flex ">
                        <span class="bg-gray-200 rounded w-10 h-6"></span>
                    </span>
                    <span class="md:w-3/12 flex justify-start  w-4/12">
                        <span class="bg-gray-200 rounded md:w-48 w-24 h-6"></span>
                    </span>
                    <span class="md:w-3/12 md:flex hidden justify-start  w-4/12">
                        <span class="bg-gray-200 rounded md:w-48 w-24 h-6"></span>
                    </span>
                    <span class="md:w-3/12 flex w-2/12">
                        <span class="bg-gray-200 rounded w-24 h-6"></span>
                    </span>
                    <span class="md:w-2/12 flex w-1/12 ">
                        <span class="bg-gray-200 rounded w-12 h-6"></span>
                    </span>
                    <span class="md:w-1/12 w-1/12 flex justify-center">
                        <span class="w-6 h-6 bg-gray-200 rounded"></span>
                    </span>
                </div>
                <div class="w-full mb-1.5  flex justify-between">
                    <span class="md:w-1/12 flex ">
                        <span class="bg-gray-200 rounded w-10 h-6"></span>
                    </span>
                    <span class="md:w-3/12 flex justify-start  w-4/12">
                        <span class="bg-gray-200 rounded md:w-32 w-20 h-6"></span>
                    </span>
                    <span class="md:w-3/12 md:flex hidden justify-start  w-4/12">
                        <span class="bg-gray-200 rounded md:w-32 w-20 h-6"></span>
                    </span>
                    <span class="md:w-3/12 flex w-2/12">
                        <span class="bg-gray-200 rounded w-36 h-6"></span>
                    </span>
                    <span class="md:w-2/12 flex w-1/12 ">
                        <span class="bg-gray-200 rounded w-12 h-6"></span>
                    </span>
                    <span class="md:w-1/12 w-1/12 flex justify-center">
                        <span class="w-6 h-6 bg-gray-200 rounded"></span>
                    </span>
                </div>
                <div class="w-full mb-1.5  flex justify-between">
                    <span class="md:w-1/12 flex ">
                        <span class="bg-gray-200 rounded w-10 h-6"></span>
                    </span>
                    <span class="md:w-3/12 flex justify-start  w-4/12">
                        <span class="bg-gray-200 rounded md:w-36 w-12 h-6"></span>
                    </span>
                    <span class="md:w-3/12 md:flex hidden justify-start  w-4/12">
                        <span class="bg-gray-200 rounded md:w-36 w-12 h-6"></span>
                    </span>
                    <span class="md:w-3/12 flex  w-2/12">
                        <span class="bg-gray-200 rounded md:w-32 w-14 h-6"></span>
                    </span>
                    <span class="md:w-2/12 flex w-1/12 ">
                        <span class="bg-gray-200 rounded w-12 h-6"></span>
                    </span>
                    <span class="md:w-1/12 w-1/12 flex justify-center">
                        <span class="w-6 h-6 bg-gray-200 rounded"></span>
                    </span>
                </div>
            </div>
            <div v-else class="flex flex-col items-center justify-center h-60">
                <NoData name="aucune marque" link="/admin/marks/new" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { BarsArrowDownIcon, ArrowLeftIcon, PencilIcon, LinkIcon } from "@heroicons/vue/24/solid"
import { PlusCircleIcon } from "@heroicons/vue/24/outline"
import Mark from "../../api/mark"
import prettyString from "../../helpers/pretty-string"
import useVerify from "../../hooks/useVerify"
import ReusableHeader from "../../components/ReusableHeader.vue"
import { formatDateToAgo } from "../../helpers/format-date"
import { onMounted,ref } from "vue"
import NoData from "../../components/NoData.vue"

const loading =ref(false)
const marks = ref([])

useVerify()
async function getMarks() {
    loading.value = true
    const result = await Mark.getAll()
    if (result.type === "success") {
        marks.value = !Array.isArray(result.data) ? [result.data] : result.data
    }
    loading.value = false
}
onMounted(getMarks)
</script>