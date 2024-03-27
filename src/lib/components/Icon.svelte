<script lang="ts">
	export let width: string | number = 20;
	export let height: string | number = 20;
	export let icon: string;
</script>

<iconify-icon icon={`heroicons:${icon}-solid`} {height} {width}></iconify-icon>
