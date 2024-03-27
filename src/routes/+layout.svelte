<script lang="ts">
	import '../app.pcss';
	import { currentUser } from '$lib/services/auth';
	import Login from '$lib/components/Login.svelte';
	import { Capacitor } from '@capacitor/core';
	import DesktopLayout from '$lib/components/DesktopLayout.svelte';
	import type NavigationElement from '$lib/types/NavigationElement';
	import MobileLayout from '$lib/components/MobileLayout.svelte';

	const routes: NavigationElement[] = [
		{
			name: 'Create',
			href: '/camera',
			svg: 'camera',
			mobileOnly: true
		},
		{
			name: 'Stuff',
			href: '/',
			svg: 'archive-box',
			mobileOnly: true
		},
		{
			name: 'Categories',
			href: '/categories',
			svg: 'tag'
		},
		{
			name: 'Locations',
			href: '/locations',
			svg: 'map-pin'
		}
	];
</script>

{#if $currentUser.model != null}
	{#if Capacitor.isNativePlatform()}
		<MobileLayout navigationElements={routes}>
			<slot />
		</MobileLayout>
	{:else}
		<DesktopLayout navigationElements={routes}>
			<slot />
		</DesktopLayout>
	{/if}
{:else}
	<div class="flex h-dvh justify-center">
		<Login />
	</div>
{/if}
