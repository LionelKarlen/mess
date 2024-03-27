<script lang="ts">
	import ContainerList from '$lib/components/ContainerList.svelte';
	import categories from '$lib/services/categories';
</script>

<ContainerList containerStore={categories} containerName="Category" containerNamePlural="Categories"
></ContainerList>
