<template>
	<Select v-model="selectedModel">
		<SelectTrigger class="max-w-min">
			<SelectValue placeholder="Select a model" />
		</SelectTrigger>
		<SelectContent>
			<SelectGroup>
				<SelectLabel>Ollama Models</SelectLabel>
				<SelectItem v-for="model in allModels" :key="model" :value="model.name">
					{{ model.name }}
				</SelectItem>
			</SelectGroup>
		</SelectContent>
	</Select>
</template>
<script setup>
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useChatStore } from '@/stores/ChatStore'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

const chatStore = useChatStore()
const { selectedModel, allModels } = storeToRefs(chatStore)

onMounted(async () => {
	await chatStore.fetchModels()
})
</script>
