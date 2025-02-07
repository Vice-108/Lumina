<template>
	<div class="flex-1 space-y-3 p-3 overflow-y-auto" ref="chatRoomContainer">
		<div v-if="chatRoomMessages.length === 0 && !isStreaming">
			<HeroScreen />
		</div>
		<div v-for="message in chatRoomMessages" :key="message.content">
			<div v-if="message.role === 'user'" class="bg-secondary p-3 border rounded-md">
				<User class="w-6 h-6" />
				{{ message.content }}
			</div>
			<div v-else class="bg-background p-3 border rounded-md max-w-[95vw]">
				<Bot class="w-6 h-6" />
				<div
					class="break-words dark:prose-invert overflow-hidden markdown-content prose-sm"
					style="overflow-wrap: break-word; word-break: break-word"
					v-html="useMarkdown(message.content)"
				></div>
			</div>
		</div>
		<div v-if="isStreaming" class="bg-background p-3 border rounded-md max-w-[95vw]">
			<Bot class="w-6 h-6" />
			<div v-if="!modelResponse" class="text-center">
				<div class="space-y-2 mt-2">
					<Skeleton class="h-4"/>
					<Skeleton class="w-1/2 h-4"/>
					<Skeleton class="w-1/3 h-4"/>
				</div>
			</div>
			<div
				class="break-words dark:prose-invert overflow-hidden markdown-content prose-sm"
				style="overflow-wrap: break-word; word-break: break-word"
				v-html="useMarkdown(modelResponse)"
			></div>
		</div>
	</div>
</template>

<script setup>
import '@catppuccin/highlightjs/css/catppuccin-mocha.css'
import { ref, watch, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useChatStore } from '@/stores/ChatStore'
import useMarkdown from '@/composables/useMarkdown'
import { Bot, User } from 'lucide-vue-next'
import { Skeleton } from '@/components/ui/skeleton'
import HeroScreen from '@/components/custom/HeroScreen.vue'

const chatRoomContainer = ref(null)
const chatStore = useChatStore()
const { chatRoomMessages, modelResponse, isStreaming } = storeToRefs(chatStore)

watch(
	[chatRoomMessages, () => modelResponse.value],
	() => {
		nextTick(() => {
			if (chatRoomContainer.value) {
				chatRoomContainer.value.scrollTo({
					top: chatRoomContainer.value.scrollHeight,
					behavior: 'smooth',
				})
			}
		})
	},
	{ deep: true },
)
</script>
