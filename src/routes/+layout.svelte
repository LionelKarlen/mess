<script>
	import { currentUser } from '$lib/services/auth';
</script>

{#if $currentUser.model != null}
	show home page
{:else}
	not logged in
{/if}
