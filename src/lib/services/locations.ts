import { writable } from 'svelte/store';
import pb from './pb';
import type CLocation from '$lib/types/Location';

const locations = writable<CLocation[]>(await pb.collection('locations').getFullList());

export default locations;
