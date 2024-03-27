<script lang="ts">
	import type Container from '$lib/types/Container';

	export let container: Container | undefined;
</script>

{#if container}
	{container.name}
{/if}
