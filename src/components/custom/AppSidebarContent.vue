<template>
	<SidebarContent>
		<SidebarGroup>
			<SidebarGroupLabel>Chat History</SidebarGroupLabel>
			<SidebarGroupContent>
				<SidebarMenu>
					<TransitionGroup name="fade">
						<SidebarMenuItem v-for="chatRoom in chatRooms" :key="chatRoom.id">
							<SidebarMenuButton
								class="hover:bg-gray-200 dark:hover:bg-slate-800"
								as-child
							>
								<div class="flex justify-between items-center gap-3">
									<div
										class="flex flex-grow items-center gap-3 cursor-pointer"
										@click="handleChatRoomMessages(chatRoom)"
									>
										<MessageSquare class="size-4" />
										<div class="flex-wrap text-xs">
											{{ chatRoom.title }}
										</div>
									</div>
									<div
										class="space-x-2 opacity-0 hover:opacity-100 min-w-10 transition-opacity duration-100"
									>
										<RenameDialog :chatroom="chatRoom" />
										<DeleteDialog :chatroom="chatRoom" />
									</div>
								</div>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</TransitionGroup>
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	</SidebarContent>
</template>
<script setup>
import {
	SidebarContent,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
} from '@/components/ui/sidebar'
import { MessageSquare } from 'lucide-vue-next'
import { useChatStore } from '@/stores/ChatStore'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import RenameDialog from './RenameDialog.vue'
import DeleteDialog from './DeleteDialog.vue'

const chatStore = useChatStore()
const { chatRooms } = storeToRefs(chatStore)

const handleChatRoomMessages = (e) => {
	chatStore.fetchChatMessages(e.id)
}

onMounted(() => {
	chatStore.fetchChatHistory()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
	transform: translateX(-30px);
}

.fade-move {
	transition: transform 0.3s ease;
}
</style>
