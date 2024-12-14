<template>
    <div class="w-[512px] border-border border-2 rounded-lg p-8 space-y-6">
        <div class="flex flex-col items-center gap-2">
            <Bot class="w-12 h-12 text-primary" />
            <h1 class="text-2xl font-bold">Welcome back</h1>
            <h2>Enter your credentials to login to your account.</h2>
        </div>

        <form class="space-y-5">
            <div class="space-y-4">
                <div class="space-y-2">
                    <Label for="login-email">Email</Label>
                    <Input
                        id="login-email"
                        placeholder="hi@yourcompany.com"
                        type="email"
                        required
                    />
                </div>
                <div class="space-y-2">
                    <Label for="login-password">Password</Label>
                    <Input
                        id="login-password"
                        placeholder="Enter your password"
                        type="password"
                        required
                    />
                </div>
            </div>
            <div class="flex justify-between gap-2">
                <div class="flex items-center gap-2">
                    <Checkbox id="login-remember" v-model="rememberMe" />
                    <Label for="login-remember" class="font-normal text-muted-foreground">
                        Remember me
                    </Label>
                </div>
                <a class="text-sm underline hover:no-underline" href="#">Forgot password?</a>
            </div>
            <Button type="button" class="w-full">Sign in</Button>
        </form>

        <div
            class="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border"
        >
            <span class="text-xs text-muted-foreground">Or</span>
        </div>

        <Button variant="outline" class="w-full">Login with Google</Button>
    </div>
</template>
<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';
import Label from '@/components/ui/label/Label.vue';
import { Bot } from 'lucide-vue-next';
import { ref } from 'vue';

const rememberMe = ref(false);
</script>
<style scoped></style>
