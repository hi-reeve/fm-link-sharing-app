import { type MultiPartData } from "h3";
import { createStorage } from "unstorage";
import fsLiteDriver from "unstorage/drivers/fs-lite";
import { randomUUID } from "node:crypto";
//file to blob
export function fileToBlob(file: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () =>
            resolve(
                new Blob([reader.result as ArrayBuffer], { type: file.type })
            );
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}

const FILE_KEYS = ["name", "filename", "type", "data"];
export const isFile = (data: MultiPartData) => {
    return (
        Object.keys(data).filter(key => FILE_KEYS.indexOf(key) !== -1)
            .length === FILE_KEYS.length
    );
};
//parse multipart form data
export const parseMultipartFormData = <TResult>(data: MultiPartData[]) => {
    return data.reduce<TResult>((prev, current) => {
        prev = {
            ...prev,
            [current.name!]: isFile(current)
                ? current
                : current.data.toString("utf8"),
        };
        // @ts-ignore
        return prev;
    }, {} as TResult);
};

export const UPLOAD_DIR = "./public/uploads";
export const storage = createStorage({
    driver: fsLiteDriver({ base: UPLOAD_DIR }),
});

export const saveFile = async (file: MultiPartData) => {
    const [_mime, ext] = String(file.type).split("/");
    const fileName = `${file.filename}-${randomUUID()}.${ext}`;
    await storage.setItemRaw(fileName, file.data);
    return `/uploads/${fileName}`;
};
