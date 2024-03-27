import { dev } from '$app/environment';
import axios from 'axios';
import PocketBase from 'pocketbase';

const gisturl =
	'https://gist.githubusercontent.com/LionelKarlen/37d1595dbd457ea5155ffc0da75a8a93/raw/messdb';

async function getPBPath(): Promise<string> {
	if (!dev) {
		const res = await axios.get(gisturl);
		return res.data;
	}
	return 'http://127.0.0.1:8090';
}

const pb = new PocketBase(await getPBPath());

export default pb;
