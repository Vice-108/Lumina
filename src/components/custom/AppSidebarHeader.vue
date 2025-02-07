<template>
	<SidebarHeader>
		<SidebarMenu>
			<SidebarMenuItem>
				<div class="flex items-center gap-2">
					<div
						class="flex justify-center items-center bg-sidebar-primary rounded-lg text-sidebar-primary-foreground aspect-square size-8"
					>
						<GalleryVerticalEnd class="size-4" />
					</div>
					<div class="flex flex-col gap-0.5 leading-none">
						<span class="font-semibold">Lumina UI</span>
					</div>
				</div>
			</SidebarMenuItem>
		</SidebarMenu>
		<Button class="mx-2" variant="outline" @click="handleNewChat">
			<Plus /> Create new chat
		</Button>
	</SidebarHeader>
</template>
<script setup>
import { SidebarHeader, SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar'
import { GalleryVerticalEnd, Plus } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { useChatStore } from '@/stores/ChatStore'

const chatStore = useChatStore()

const handleNewChat = () => {
	chatStore.startNewChat()
}
</script>
