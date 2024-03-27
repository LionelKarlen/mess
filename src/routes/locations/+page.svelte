<script lang="ts">
	import ContainerList from '$lib/components/ContainerList.svelte';
	import locations from '$lib/services/locations';
</script>

<ContainerList containerStore={locations} containerName="Location" containerNamePlural="Locations"
></ContainerList>
