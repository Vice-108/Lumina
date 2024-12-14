<template>
    <div class="space-y-6 border-2 p-8 border-border rounded-lg w-[512px]">
        <div class="flex flex-col items-center gap-2">
            <Bot class="w-12 h-12 text-primary" />
            <h1 class="font-bold text-2xl">Welcome back</h1>
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
    </div>
</template>
<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';
import Label from '@/components/ui/label/Label.vue';
import Checkbox from '@/components/ui/checkbox/Checkbox.vue';
import { Bot } from 'lucide-vue-next';
import { ref } from 'vue';

const rememberMe = ref(false);
</script>
<style scoped></style>