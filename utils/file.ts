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
