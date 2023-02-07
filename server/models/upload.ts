import multer from 'multer';
import type { Options } from 'multer';
import fs from 'fs';
import { v4 } from 'uuid';
import type { IServerResponse, FileType, ItemType } from 'types';
export const uploadService = () => {
	let folderPath = './public/';
	const { limits: templateLimits }: Options = {
		limits: {
			files: 1,
			fieldNameSize: 400,
			fileSize: 80 * 1024 * 1024,
		},
	};

	const createFolderIfNotExist = (path: string) => {
		if (!fs.existsSync(path)) {
			fs.mkdirSync(path, { recursive: true });
		}
	};

	const { filename }: multer.DiskStorageOptions = {
		filename: (_req, file, cb) => {
			const splittedFileName = file.originalname.split('.');
			let name = splittedFileName[0];
			const type = splittedFileName[1];
			name += '-' + v4().slice(0, 5) + '.' + type;
			cb(null, name);
		},
	};

	const destination = (itemType: ItemType, fileType: FileType) => {
		const { destination }: multer.DiskStorageOptions = {
			destination: async (_req, _file, cb) => {
				folderPath += `${fileType}/${itemType}`;
				createFolderIfNotExist(folderPath);
				cb(null, folderPath);
			},
		};
		return destination;
	};

	const generateHandler = (itemType: ItemType, fileType: FileType) => {
		try {
			if (!fileType)
				throw new Error('File type не указан или указан неверно.');

			if (!itemType)
				throw new Error('Item type не указан или указан неверно.');

			const options: Options = {
				limits: {
					...templateLimits,
				},
				storage: multer.diskStorage({
					filename,
					destination: destination(itemType, fileType),
				}),
			};

			return multer(options).single('file');
		} catch (e) {
			throw e;
		}
	};
	return { generateHandler };
};