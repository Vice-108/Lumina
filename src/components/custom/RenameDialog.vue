<template>
	<AlertDialog>
		<AlertDialogTrigger>
			<Pencil class="size-4" />
		</AlertDialogTrigger>
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>Rename Chat</AlertDialogTitle>
				<AlertDialogDescription> Enter a new title for this chat </AlertDialogDescription>
			</AlertDialogHeader>
			<div class="py-4">
				<Input v-model="newTitle" placeholder="Enter new title" />
			</div>
			<AlertDialogFooter>
				<AlertDialogCancel>Cancel</AlertDialogCancel>
				<AlertDialogAction
					@click="handleRename"
					:disabled="!newTitle || newTitle === chatroom.title"
				>
					Rename
				</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>
</template>

<script setup>
import {
	AlertDialogTrigger,
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { useChatStore } from '@/stores/ChatStore'
import { ref } from 'vue'
import { Pencil } from 'lucide-vue-next'
const props = defineProps({
	chatroom: {
		type: Object,
		required: true,
	},
})

const chatStore = useChatStore()
const newTitle = ref(props.chatroom.title)

const handleRename = async () => {
	if (newTitle.value && newTitle.value !== props.chatroom.title) {
		await chatStore.renameChatRoom(props.chatroom.id, newTitle.value)
	}
}
</script>
