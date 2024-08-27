<template>
    <div class="h-screen w-screen bg-[#eee] flex items-center justify-center gap-10">
        <div>
            <textarea
                class="bg-white border rounded-lg shadow-md p-2 h-[60vh] w-[40vw] resize-none"
                v-model="objectText"
            ></textarea>
        </div>
        <div>
            <button
                class="bg-blue-500 text-white rounded-lg px-4 py-2 mt-4"
                @click="convert"
            >Convert to JSON</button>
        </div>
        <div>
            <textarea
                class="bg-white border rounded-lg shadow-md p-2 h-[60vh] w-[40vw] resize-none"
                v-model="jsonText"
            ></textarea>
        </div>
    </div>
</template>

<script lang="ts" setup>
const objectText = ref('') 
const jsonText = ref('')
const convert = () => {
    const obj = eval("(" + objectText.value + ")");
    console.log(obj)
    jsonText.value = JSON.stringify(obj, null, 2)
    console.log(jsonText.value)
}
</script>