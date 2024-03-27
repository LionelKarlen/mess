<script lang="ts">
	import type NavigationElement from '$lib/types/NavigationElement';
	import 'iconify-icon';
	import Icon from './Icon.svelte';
	import { page } from '$app/stores';

	export let navigationElements: NavigationElement[];
</script>

<div class="navbar mb-5 bg-base-200">
	<div class="navbar-start">
		<a class="nohover btn btn-ghost text-xl normal-case" href="/">
			<img src="messlogo.svg" height="35" width="35" alt="mess logo" />
			mess</a
		>
	</div>
	<div class="navbar-end gap-3">
		<a class="btn btn-ghost" href="/logout" data-sveltekit-preload-data="tap">
			<Icon icon="arrow-left-start-on-rectangle" height="20" width="20"></Icon>
		</a>
	</div>
</div>
<div class="flex flex-row justify-center px-10">
	<div class="flex w-full flex-col">
		<slot />
	</div>
</div>
<div class="btm-nav">
	{#each navigationElements as navigationElement}
		<a href={navigationElement.href} class:active={$page.url.pathname === navigationElement.href}>
			<Icon icon={navigationElement.svg} height={20} width={20} />
			{navigationElement.name}
		</a>
	{/each}
</div>
