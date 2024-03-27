<script lang="ts">
	import { goto } from '$app/navigation';
	import pb from '$lib/services/pb';
	import type Container from '$lib/types/Container';
	import Icon from './Icon.svelte';

	export let containerCollection: string;
	export let containerName: string;
	export let isEdit: boolean = false;
	export let id: string;

	let name: string;

	async function getData() {
		if (isEdit) {
			const container: Container = await pb.collection(containerCollection).getOne(id);
			name = container.name;
		}
	}

	getData();

	async function handleSubmit() {
		if (isEdit) {
			await pb.collection(containerCollection).update(id, { name: name });
		} else {
			await pb.collection(containerCollection).create({ name: name });
		}
		goto(`/${containerCollection}`);
	}

	async function handleDelete() {
		await pb.collection(containerCollection).delete(id);
		goto(`/${containerCollection}`);
	}
</script>

<form
	class="flex w-full flex-col justify-center gap-2 sm:w-1/2"
	on:submit|preventDefault={handleSubmit}
>
	<div class="flex flex-row items-center justify-between">
		<h3 class="mb-2 text-xl">{isEdit ? `Edit ${containerName}` : `Create new ${containerName}`}</h3>
		{#if isEdit}
			<button class="btn btn-ghost btn-error" on:click={handleDelete}>
				<Icon icon="trash" />
			</button>
		{/if}
	</div>
	<label class="input input-bordered flex items-center gap-2">
		<Icon icon="cube" />
		<input type="text" class="grow" placeholder="Name" bind:value={name} />
	</label>

	<button class="btn btn-primary" disabled={name == null || name.length == 0}
		>{isEdit ? 'Update' : 'Add'}</button
	>
</form>
