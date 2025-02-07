<template>
	<AlertDialog>
		<AlertDialogTrigger>
			<Trash2 class="size-4" />
		</AlertDialogTrigger>
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>Delete Chat</AlertDialogTitle>
				<AlertDialogDescription>
					Are you sure you want to delete this chat? This action cannot be undone.
				</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel>Cancel</AlertDialogCancel>
				<AlertDialogAction
					@click="handleDelete"
					class="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
				>
					Delete
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
import { useChatStore } from '@/stores/ChatStore'
import { Trash2 } from 'lucide-vue-next'

const props = defineProps({
	chatroom: {
		type: Object,
		required: true,
	},
})

const chatStore = useChatStore()

const handleDelete = async () => {
	await chatStore.deleteChatRoom(props.chatroom.id)
}
</script>
