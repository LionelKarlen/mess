<script>
	import '../app.pcss';
	import { currentUser } from '$lib/services/auth';
	import Login from '$lib/components/Login.svelte';
</script>

{#if $currentUser.model != null}
	home page
	<slot />
{:else}
	<div class="-full flex h-dvh justify-center">
		<Login />
	</div>
{/if}
