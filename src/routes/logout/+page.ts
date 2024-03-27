import { goto } from '$app/navigation';
import pb from '$lib/services/pb';
export function load() {
	pb.authStore.clear();
	goto('/');
}
