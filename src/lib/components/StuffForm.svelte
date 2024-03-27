<script lang="ts">
	import { goto } from '$app/navigation';
	import categories from '$lib/services/categories';
	import locations from '$lib/services/locations';
	import pb from '$lib/services/pb';
	import type Container from '$lib/types/Container';
	import Icon from './Icon.svelte';
	import SelectMultiple from './SelectMultiple.svelte';
	import SelectSingle from './SelectSingle.svelte';

	export let isEdit: boolean = false;
	export let id: string;

	let name: string;
	let location: string;
	let designation: string;
	let localCategories: string[] = [];

	function poll() {
		console.log(location);
		console.log(localCategories);
	}

	async function getData() {
		if (isEdit) {
			const container: Container = await pb.collection('stuff').getOne(id);
			name = container.name;
		}
	}

	getData();

	async function handleSubmit() {
		console.log('handlesubmit');
		if (isEdit) {
			await pb.collection('stuff').update(id, { name: name });
		} else {
			await pb.collection('stuff').create({ name: name });
		}
		goto(`/${'stuff'}`);
	}

	async function handleDelete() {
		await pb.collection('stuff').delete(id);
		goto(`/${'stuff'}`);
	}
</script>

<form
	class="flex w-full flex-col justify-center gap-2 sm:w-1/2"
	on:submit|preventDefault={handleSubmit}
>
	<div class="flex flex-row items-center justify-between">
		<h3 class="mb-2 text-xl">{isEdit ? `Edit Stuff Entry` : `Create new Stuff`}</h3>
		{#if isEdit}
			<button class="btn btn-ghost btn-error" type="button" on:click={handleDelete}>
				<Icon icon="trash" />
			</button>
		{/if}
	</div>

	<label class="input input-bordered flex items-center gap-2">
		<Icon icon="cube" />
		<input type="text" class="grow" placeholder="Name" bind:value={name} />
	</label>

	<label class="input input-bordered flex items-center gap-2">
		<Icon icon="cube" />
		<input type="text" class="grow" placeholder="Name" bind:value={name} />
	</label>

	<SelectMultiple
		options={$categories}
		icon="tag"
		placeholder="Categories"
		bind:value={localCategories}
	/>

	<SelectSingle options={$locations} icon="map-pin" placeholder="Location" bind:value={location} />

	<SelectSingle
		options={$locations}
		icon="archive-box-arrow-down"
		placeholder="Designation"
		bind:value={designation}
	/>

	<button class="btn btn-primary" disabled={name == null || name.length == 0}
		>{isEdit ? 'Update' : 'Add'}</button
	>
	<button class="btn btn-secondary" type="button" on:click={poll}>poll</button>
</form>
