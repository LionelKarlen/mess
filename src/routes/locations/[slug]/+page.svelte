<script lang="ts">
	import ContainerForm from '$lib/components/ContainerForm.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let id = data.id;

	let isEdit = id != 'new' ? true : false;
</script>

<ContainerForm containerCollection="locations" {isEdit} containerName="Location" {id} />
