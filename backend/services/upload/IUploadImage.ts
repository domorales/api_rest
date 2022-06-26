export interface IUploadImage {
	upload(oldPath: string, newPath: string): Promise<string>;
}
