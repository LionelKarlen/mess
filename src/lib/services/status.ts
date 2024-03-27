import { Status } from '$lib/types/Status';
import type Stuff from '../types/Stuff';

export function calculateStatus(stuff: Stuff): Status {
	let status: Status = Status.INCOMPLETE;
	if (stuff.name && stuff.image) {
		if (stuff.categories && stuff.categories.length > 0) {
			if (stuff.designation && stuff.location) {
				status = Status.TRANSIT;
				if (stuff.designation.id == stuff.location.id) {
					status = Status.DONE;
				}
			}
		}
	}
	return status;
}
