<template>
	<header
		class="top-0 sticky flex justify-between items-center gap-2 bg-background px-4 border-b h-16"
	>
		<div class="flex items-center gap-2">
			<SidebarTrigger class="-ml-1" />
			<Separator orientation="vertical" class="mr-2 h-4" />
			<SelectModel />
		</div>
		<DarkModeToggle />
	</header>
</template>

<script setup>
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import DarkModeToggle from '@/components/custom/DarkModeToggle.vue'
import SelectModel from '@/components/custom/SelectModel.vue'
</script>
