<script lang="ts">
	export let width: string | number = 24;
	export let height: string | number = 24;
	export let icon: string;
</script>

<iconify-icon icon={`heroicons:${icon}-solid`} {height} {width}></iconify-icon>
