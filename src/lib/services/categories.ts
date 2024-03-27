import { writable } from 'svelte/store';
import pb from './pb';
import type CCategory from '$lib/types/Category';

const categories = writable<CCategory[]>(await pb.collection('categories').getFullList());

export default categories;
