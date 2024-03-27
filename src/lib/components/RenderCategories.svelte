<script lang="ts">
	import type CCategory from '$lib/types/Category';

	export let categories: CCategory[] | undefined;
</script>

{#if categories}
	<div class="flex flex-row flex-wrap gap-2">
		{#each categories as item}
			<div class="badge badge-neutral">{item.name}</div>
		{/each}
	</div>
{/if}
