<script lang="ts">
	import StuffForm from '$lib/components/StuffForm.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const id = data.id;
	const isEdit = id != 'new' ? true : false;
</script>

<StuffForm {id} {isEdit}></StuffForm>
