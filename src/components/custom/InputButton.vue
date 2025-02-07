<template>
	<div class="space-y-2 p-3">
		<div class="flex shadow-black/[.04] shadow-sm rounded-lg">
			<Textarea
				v-model="promptMessage"
				class="[resize:none] focus-visible:z-10 flex-1 shadow-none rounded-e-none -me-px"
				placeholder="Enter your prompt here..."
				rows="2"
			/>
			<button
				@click="sendMessage"
				class="inline-flex focus:z-10 items-center border-input bg-background hover:bg-accent disabled:opacity-50 px-6 border focus-visible:border-ring rounded-e-lg focus-visible:ring-2 focus-visible:ring-ring/30 ring-offset-background focus-visible:ring-offset-2 font-medium text-foreground text-sm hover:text-foreground transition-shadow focus-visible:outline-none disabled:cursor-not-allowed disabled:pointer-events-none"
			>
				{{ isStreaming ? 'Stop' : 'Send' }}
			</button>
		</div>
	</div>
</template>

<script setup>
import { Textarea } from '../ui/textarea'
import { useChatStore } from '@/stores/ChatStore'
import { storeToRefs } from 'pinia'

const chatStore = useChatStore()
const { promptMessage, isStreaming } = storeToRefs(chatStore)

const sendMessage = () => {
	if (isStreaming.value) {
		chatStore.sendMessage(null)
	} else {
		if (promptMessage.value.trim() === '') return
		chatStore.sendMessage(promptMessage.value)
		promptMessage.value = ''
	}
}
</script>
