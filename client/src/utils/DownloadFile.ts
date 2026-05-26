export const downloadFile = (blobData: Blob, fileName: string) => {
    const url = window.URL.createObjectURL(blobData);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);

    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
};