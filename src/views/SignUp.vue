<template>
    <div class="space-y-6 border-2 p-8 border-border rounded-lg w-[512px]">
        <div class="flex flex-col items-center gap-2">
            <Bot class="w-12 h-12 text-primary" />
            <h2 class="font-bold text-2xl">Sign up</h2>
        </div>
        <form class="space-y-5">
            <div class="space-y-4">
                <div class="space-y-2">
                    <Label for="signup-name">Full name</Label>
                    <Input id="signup-name" placeholder="Matt Welsh" type="text" required />
                </div>
                <div class="space-y-2">
                    <Label for="signup-email">Email</Label>
                    <Input
                        id="signup-email"
                        placeholder="hi@yourcompany.com"
                        type="email"
                        required
                    />
                </div>
                <div class="space-y-2">
                    <Label for="signup-password">Password</Label>
                    <Input
                        id="signup-password"
                        placeholder="Enter your password"
                        type="password"
                        required
                    />
                </div>
            </div>
            <Button type="button" class="w-full">Sign up</Button>
        </form>
    </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';
import Label from '@/components/ui/label/Label.vue';
import { Bot } from 'lucide-vue-next';
</script>

<style scoped></style>
