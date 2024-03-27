<script lang="ts">
	import type Container from '$lib/types/Container';
	import Icon from './Icon.svelte';
	export let options: Container[];
	export let icon: string = 'clipboard';
	export let placeholder: string;
	export let selected: Set<Option> = new Set();
	export let value: string[];

	let localOptions = options.map((v) => {
		return {
			name: v.name,
			value: v.id
		};
	});

	function updateValue(selected: Set<Option>) {
		const arr: string[] = [];
		selected.forEach((v) => arr.push(v.value));
		value = arr;
	}

	$: updateValue(selected);

	interface Option {
		name: string;
		value: string;
	}

	function selectionAdd(opt: Option) {
		selected.add(opt);
		selected = selected;
	}

	function selectionDelete(opt: Option) {
		selected.delete(opt);
		selected = selected;
	}

	function selectionClear() {
		selected.clear();
		selected = selected;
	}
</script>

<div class="input input-bordered flex items-center gap-2">
	<Icon {icon} />
	<div class="dropdown w-full">
		<div
			tabindex="0"
			role="button"
			class="select select-ghost flex w-full grow flex-wrap items-center gap-2 px-0 focus:border-x-0 focus:outline-none"
		>
			{#if selected.size > 0}
				{#each selected as item}
					<div class="badge badge-secondary">
						{item.name}
						<button
							type="button"
							class="flex items-center justify-between"
							on:click={() => selectionDelete(item)}
							><Icon icon="x-mark" height="16" width="16"></Icon></button
						>
					</div>
				{/each}
			{:else}
				<p class="text-inherit">{placeholder}</p>
			{/if}
		</div>
		<ul class="menu dropdown-content z-[1] w-full rounded-box bg-base-100 p-2 shadow">
			{#each localOptions as opt}
				<li><button type="button" on:click={() => selectionAdd(opt)}>{opt.name}</button></li>
			{/each}
		</ul>
	</div>
	<button
		type="button"
		disabled={selected.size == 0}
		class="flex flex-col items-center justify-center"
		on:click={selectionClear}><Icon icon="x-mark"></Icon></button
	>
</div>
