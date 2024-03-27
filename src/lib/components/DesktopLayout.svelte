<script lang="ts">
	import type NavigationElement from '$lib/types/NavigationElement';
	import 'iconify-icon';
	import Icon from './Icon.svelte';

	export let navigationElements: NavigationElement[];
</script>

<div class="navbar mb-5 bg-base-200">
	<div class="navbar-start">
		<a class="nohover btn btn-ghost text-xl normal-case" href="/">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="icon icon-tabler icons-tabler-outline icon-tabler-package"
				><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
					d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5"
				/><path d="M12 12l8 -4.5" /><path d="M12 12l0 9" /><path d="M12 12l-8 -4.5" /><path
					d="M16 5.25l-8 4.5"
				/></svg
			>
			mess</a
		>
	</div>
	<div class="navbar-end gap-3">
		{#each navigationElements as navigationElement}
			{#if !navigationElement.mobileOnly}
				<a href={navigationElement.href} class="btn btn-ghost">
					<Icon icon={navigationElement.svg} />
					{navigationElement.name}
				</a>
			{/if}
		{/each}
		<a class="btn btn-ghost" href="/logout" data-sveltekit-preload-data="tap">
			<Icon icon="arrow-left-start-on-rectangle"></Icon>
		</a>
	</div>
</div>
<div class="flex flex-row justify-center px-10">
	<div class="flex w-full flex-col items-center justify-center">
		<slot />
	</div>
</div>
