<template>
	<SidebarFooter>
		<div class="flex items-center gap-2 px-4 py-2">
			<Avatar class="rounded-full w-8 h-8">
				<AvatarImage src="/moon.svg" />
				<AvatarFallback class="rounded-full"> CN </AvatarFallback>
			</Avatar>
			<div class="flex-1 grid text-left text-sm leading-tight">
				<span class="font-semibold truncate">Huehue Psyduck</span>
				<span class="text-xs truncate">gulabipooclover@gmail.com</span>
			</div>
		</div>
	</SidebarFooter>
</template>
<script setup>
import { SidebarFooter } from '@/components/ui/sidebar'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
</script>
