<script lang="ts">
	import pb from '$lib/services/pb';
	import type Container from '$lib/types/Container';
	import type { Writable } from 'svelte/store';
	import Icon from './Icon.svelte';

	export let containerStore: Writable<Container[]>;
	export let containerName: string;
	export let containerNamePlural: string;

	async function updateStore() {
		const newContainers: Container[] = await pb
			.collection(containerNamePlural.toLocaleLowerCase())
			.getFullList();
		containerStore.set(newContainers);
	}
	updateStore();
</script>

<div class="flex w-full flex-col gap-3">
	<div class="flex flex-row items-center justify-between align-middle">
		<h3 class="items-center align-middle text-xl">
			{containerNamePlural}
		</h3>
		<a class="btn btn-primary" href={`${containerNamePlural.toLowerCase()}/new`}>
			<Icon icon="plus" />
			Add {containerName}
		</a>
	</div>
	<div class="overflow-x-auto">
		<table class="table">
			<thead>
				<tr>
					<th>Name</th>
					<th class="flex justify-end">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each $containerStore as item}
					<tr>
						<td>{item.name}</td>
						<td class="flex justify-end">
							<a href={`${containerNamePlural.toLowerCase()}/${item.id}`}>
								<Icon icon="pencil-square"></Icon>
							</a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
