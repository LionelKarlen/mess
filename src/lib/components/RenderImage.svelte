<script lang="ts">
	import pb from '$lib/services/pb';
	import type Stuff from '$lib/types/Stuff';

	export let record: Stuff;
</script>

{#if record.image && record.image.length > 0}
	<img
		src={pb.files.getUrl({ collectionName: 'stuff', id: record.id }, record.image, {
			thumb: '100x100'
		})}
		height="50"
		width="50"
		alt=""
	/>
{:else}
	<div class="scale50"></div>
{/if}

<style>
	.scale50 {
		height: 50px;
		width: 50px;
	}
</style>
