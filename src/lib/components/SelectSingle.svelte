<script lang="ts">
	import type Container from '$lib/types/Container';
	import Icon from './Icon.svelte';
	export let options: Container[];
	export let icon: string = 'clipboard';
	export let placeholder: string;
	export let value: string;
</script>

<label class="input input-bordered flex items-center gap-2">
	<Icon {icon} />
	<select
		bind:value
		class="select select-ghost grow bg-transparent pl-0 text-base text-current focus:border-none focus:outline-none"
	>
		<option disabled selected value="">{placeholder}</option>
		{#each options as item}
			<option value={item.id}>{item.name}</option>
		{/each}
	</select>
	<button
		type="button"
		disabled={value == ''}
		class="flex flex-col items-center justify-center"
		on:click={() => (value = '')}><Icon icon="x-mark"></Icon></button
	>
</label>
