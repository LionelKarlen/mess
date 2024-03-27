<script lang="ts">
	import { goto } from '$app/navigation';
	import pb from '$lib/services/pb';

	let isRegister = false;

	let username: string;
	let password: string;
	let confirmPassword: string;

	async function handleSubmit() {
		if (isRegister) {
			await pb.collection('users').create({
				username: username,
				password: password,
				passwordConfirm: confirmPassword
			});
		}
		await pb.collection('users').authWithPassword(username, password);
		goto('/');
	}
</script>

<form
	class="flex w-3/4 flex-col justify-center gap-2 sm:w-1/2"
	on:submit|preventDefault={handleSubmit}
>
	<label class="input input-bordered flex items-center gap-2">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 16 16"
			fill="currentColor"
			class="h-4 w-4 opacity-70"
			><path
				d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
			/></svg
		>
		<input type="text" class="grow" placeholder="Username" bind:value={username} />
	</label>
	<label class="input input-bordered flex items-center gap-2">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 16 16"
			fill="currentColor"
			class="h-4 w-4 opacity-70"
			><path
				fill-rule="evenodd"
				d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
				clip-rule="evenodd"
			/></svg
		>
		<input type="password" class="grow" placeholder="Password" bind:value={password} />
	</label>
	{#if isRegister}
		<label class="input input-bordered flex items-center gap-2">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 16 16"
				fill="currentColor"
				class="h-4 w-4 opacity-70"
				><path
					fill-rule="evenodd"
					d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
					clip-rule="evenodd"
				/></svg
			>
			<input
				type="password"
				class="grow"
				placeholder="Confirm Password"
				bind:value={confirmPassword}
			/>
		</label>
	{/if}
	<button class="btn btn-primary">{isRegister ? 'Register' : 'Log in'}</button>
	<div class="flex flex-row gap-1">
		<p>
			{isRegister ? 'Already have an account?' : "Don't have an account yet?"}
		</p>
		<button class="btn-link btn-secondary" on:click={() => (isRegister = !isRegister)}
			>{isRegister ? 'Log in' : 'Register'}</button
		>
	</div>
</form>
