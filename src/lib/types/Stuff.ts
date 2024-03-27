import type CCategory from './Category';
import type CLocation from './Location';
import type Container from './Container';
import type { Status } from './Status';

export default interface Stuff {
	id: string;
	name?: string;
	categories?: CCategory[];
	location?: CLocation;
	designation?: CLocation;
	image?: string;
	status: Status | undefined;
}

export interface ModelStuff {
	id: string;
	name: string;
	expand: {
		categories: Container[];
		location: Container;
		designation: Container;
	};
	image: string;
}
