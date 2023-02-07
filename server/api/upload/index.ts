import { CompatibilityEvent, useQuery, callHandler } from 'h3';
import { uploadService } from '../../models/upload';
import type { IServerResponse, FileType, ItemType } from 'types';

export default async (event: CompatibilityEvent): Promise<IServerResponse> => {
	const { itemType, fileType } = useQuery(event) as { itemType: ItemType; fileType: FileType };
	try {
    const upl = uploadService();
		const handler = upl.generateHandler(itemType, fileType);
		// @ts-ignore
		await callHandler(handler, event.req, event.res);
		// @ts-ignore
		return { success: true, response: event.req?.file?.filename };
	} catch (e) {
		return { success: false, reason: e.message };
	}
};