<script lang="ts">
	import type Container from '$lib/types/Container';

	export let options: Container[];
	export let selected: Set<string>;
	export let hideEmpty = false;

	function toggleSelect(id: string) {
		if (selected.has(id)) {
			selected.delete(id);
		} else {
			selected.add(id);
		}
		selected = selected;
	}
</script>

<div class="flex w-full flex-row flex-wrap items-center gap-2 bg-transparent">
	{#if !hideEmpty}
		<!-- content here -->
		<button
			type="button"
			class="badge badge-neutral"
			class:badge-secondary={selected.has('empty')}
			on:click={() => toggleSelect('empty')}>Empty</button
		>
	{/if}
	{#each options as opt}
		<button
			type="button"
			class="badge badge-neutral"
			class:badge-secondary={selected.has(opt.id)}
			on:click={() => toggleSelect(opt.id)}>{opt.name}</button
		>
	{/each}
</div>
