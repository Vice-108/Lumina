<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<{
	showIcon?: boolean
	class?: HTMLAttributes['class']
}>()

const width = computed(() => {
	return `${Math.floor(Math.random() * 40) + 50}%`
})
</script>

<template>
	<div
		data-sidebar="menu-skeleton"
		:class="cn('rounded-md h-8 flex gap-2 px-2 items-center', props.class)"
	>
		<Skeleton v-if="showIcon" class="rounded-md size-4" data-sidebar="menu-skeleton-icon" />

		<Skeleton
			class="flex-1 max-w-[--skeleton-width] h-4"
			data-sidebar="menu-skeleton-text"
			:style="{ '--skeleton-width': width }"
		/>
	</div>
</template>
