<script lang="ts">
	import type NavigationElement from '$lib/types/NavigationElement';
	import 'iconify-icon';
	import Icon from './Icon.svelte';

	export let navigationElements: NavigationElement[];
</script>

<div class="navbar mb-5 bg-base-200">
	<div class="navbar-start">
		<a class="nohover btn btn-ghost text-xl normal-case" href="/">
			<img src="messlogo.svg" height="50" width="50" alt="mess logo" />
			mess</a
		>
	</div>
	<div class="navbar-end gap-3">
		{#each navigationElements as navigationElement}
			{#if !navigationElement.mobileOnly}
				<a href={navigationElement.href} class="btn btn-ghost">
					<Icon icon={navigationElement.svg} height={20} width={20} />
					{navigationElement.name}
				</a>
			{/if}
		{/each}
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
