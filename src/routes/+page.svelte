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
	import SelectPill from '$lib/components/SelectPill.svelte';
	import categories from '$lib/services/categories';
	import locations from '$lib/services/locations';

	let stuff: Stuff[] = [];
	let filtered: Stuff[] = stuff;

	$: filter(nameFilter, statusFilter, categoryFilter, locationFilter, designationFilter, stuff);

	let nameFilter = '';
	let statusFilter = new Set<string>('');
	let categoryFilter = new Set<string>();
	let locationFilter = new Set<string>();
	let designationFilter = new Set<string>();

	function filter(
		nameFilter: string,
		statusFilter: Set<string>,
		categoryFilter: Set<string>,
		locationFilter: Set<string>,
		designationFilter: Set<string>,
		stuff: Stuff[]
	) {
		filtered = stuff.filter((v) => v.name?.startsWith(nameFilter));
		if (statusFilter.size > 0) {
			filtered = filtered.filter((v) => statusFilter.has(v.status ?? ''));
		}
		if (categoryFilter.size > 0) {
			filtered = filtered.filter(
				(v) =>
					v.categories?.some((c) => categoryFilter.has(c.id)) ||
					(categoryFilter.has('empty') && !v.categories)
			);
		}
		if (locationFilter.size > 0) {
			filtered = filtered.filter((v) => locationFilter.has(v.location?.id ?? 'empty'));
		}
		if (designationFilter.size > 0) {
			filtered = filtered.filter((v) => designationFilter.has(v.designation?.id ?? 'empty'));
		}
	}

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
		filtered = stuff;
	}

	getData();
</script>

<div class="flex w-full flex-col gap-3">
	<div class="flex flex-row items-center justify-between align-middle">
		<div class="flex flex-row items-center gap-2">
			<h3 class="items-center align-middle text-xl">Stuff</h3>
			<details class="dropdown">
				<summary class="btn btn-ghost"><Icon icon="funnel" /></summary>
				<ul class="menu dropdown-content z-[1] rounded-box bg-base-200 p-2 shadow sm:p-3">
					<div>
						<h3 class="text-lg">Name</h3>
						<li>
							<label class="input input-bordered flex items-center gap-2">
								<Icon icon="magnifying-glass" />
								<input type="text" class="grow" placeholder="Name" bind:value={nameFilter} />
							</label>
						</li>
					</div>

					<div class="divider"></div>

					<div class="!hover:bg-transparent">
						<h3 class="text-lg">Status</h3>
						<SelectPill
							hideEmpty={true}
							options={Object.keys(Status).map((v) => {
								return {
									name: v,
									id: v.toLowerCase()
								};
							})}
							bind:selected={statusFilter}
						/>
					</div>

					<div class="divider"></div>

					<div class="!hover:bg-transparent">
						<h3 class="text-lg">Category</h3>
						<SelectPill options={$categories} bind:selected={categoryFilter} />
					</div>

					<div class="divider"></div>

					<div class="!hover:bg-transparent">
						<h3 class="text-lg">Location</h3>
						<SelectPill options={$locations} bind:selected={locationFilter} />
					</div>

					<div class="divider"></div>

					<div class="!hover:bg-transparent">
						<h3 class="text-lg">Designation</h3>
						<SelectPill options={$locations} bind:selected={designationFilter} />
					</div>
				</ul>
			</details>
		</div>
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
				{#each filtered as item}
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
