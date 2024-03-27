<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import pb from '$lib/services/pb';
	import type { ModelStuff } from '$lib/types/Stuff';
	import type Stuff from '$lib/types/Stuff';
	import RenderContainer from '$lib/components/RenderContainer.svelte';
	import RenderImage from '$lib/components/RenderImage.svelte';
	import RenderCategories from '$lib/components/RenderCategories.svelte';
	import { calculateStatus } from '$lib/services/status';
	import { Status } from '$lib/types/Status';

	let stuff: Stuff[] = [];

	async function getData() {
		const tmpStuff: ModelStuff[] = await pb
			.collection('stuff')
			.getFullList({ expand: 'categories, location,designation' });

		for (const tmp of tmpStuff) {
			const tmpExpand = tmp.expand ?? { categories: [] };
			const localStuff: Stuff = {
				id: tmp.id,
				name: tmp.name,
				categories: tmpExpand.categories,
				location: tmp.expand?.location,
				designation: tmp.expand?.designation,
				image: tmp.image,
				status: undefined
			};
			localStuff.status = calculateStatus(localStuff);
			stuff.push(localStuff);
		}
		stuff = stuff;
	}
	getData();
</script>

<div class="flex w-full flex-col gap-3">
	<div class="flex flex-row items-center justify-between align-middle">
		<h3 class="items-center align-middle text-xl">Stuff</h3>
		<a class="btn btn-primary" href={`stuff/new`}>
			<Icon icon="plus" />
			Add Stuff
		</a>
	</div>
	<div class="overflow-x-auto">
		<table class="table">
			<thead>
				<tr>
					<th>Name</th>
					<th>Image</th>
					<th>Categories</th>
					<th>Location</th>
					<th>Designation</th>
					<th class="flex justify-end">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each stuff as item}
					<tr
						class:border-l-warning={item.status == Status.TRANSIT}
						class:border-l-success={item.status == Status.DONE}
						class:border-l-error={item.status == Status.INCOMPLETE}
						class="items-center border-l-2"
					>
						<td>{item.name}</td>
						<td><RenderImage record={item}></RenderImage></td>
						<td><RenderCategories categories={item.categories}></RenderCategories></td>
						<td><RenderContainer container={item.location} /> </td>
						<td><RenderContainer container={item.designation} /> </td>
						<!-- TODO: Fix vertical alignment of actions -->
						<td class="flex h-full flex-row items-center justify-end">
							<a href={`stuff/${item.id}`}>
								<Icon icon="pencil-square"></Icon>
							</a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
