<template>
	<SidebarProvider>
		<Sidebar>
			<app-sidebar-header class="sidebar" />
			<Separator orientation="horizontal" />
			<app-sidebar-content class="sidebar" />
			<Separator orientation="horizontal" />
			<app-sidebar-footer class="sidebar" />
			<SidebarRail />
		</Sidebar>

		<SidebarInset>
			<div class="flex flex-col w-full h-full max-h-screen overflow-x-hidden">
				<AppHeader />
				<ChatRoom />
				<InputButton />
			</div>
		</SidebarInset>
	</SidebarProvider>
</template>

<script setup>
import AppHeader from '@/components/custom/AppHeader.vue'
import ChatRoom from '@/components/custom/ChatRoom.vue'
import InputButton from '@/components/custom/InputButton.vue'
import AppSidebarContent from '@/components/custom/AppSidebarContent.vue'
import AppSidebarHeader from '@/components/custom/AppSidebarHeader.vue'
import AppSidebarFooter from '@/components/custom/AppSidebarFooter.vue'
import { Sidebar, SidebarInset, SidebarProvider, SidebarRail } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
</script>
