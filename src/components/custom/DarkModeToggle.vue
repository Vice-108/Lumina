<template>
	<div>
		<div
			class="group inline-flex items-center gap-2"
			:data-state="checked ? 'checked' : 'unchecked'"
		>
			<Sun :size="16" stroke-width="2" aria-hidden="true" />
			<Switch
				:checked="checked"
				aria-labelledby="switch-off-label switch-on-label"
				aria-label="Toggle between dark and light mode"
				@update:checked="toggleSwitch"
			/>
			<Moon :size="16" stroke-width="2" aria-hidden="true" />
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { Switch } from '@/components/ui/switch'
import { Moon, Sun } from 'lucide-vue-next'
import { useColorMode } from '@vueuse/core'

const mode = useColorMode()

const checked = ref(mode.value === 'dark')

const toggleSwitch = () => {
	checked.value = !checked.value
	mode.value = checked.value ? 'dark' : 'light'
}
</script>
