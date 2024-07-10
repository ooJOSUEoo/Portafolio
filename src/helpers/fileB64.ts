
export const optomizeImage = (file:Blob, quality:number,) =>{
    return new Promise<Blob>((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const imagen = new Image();
        imagen.onload = () => {
          canvas.width = imagen.width;
          canvas.height = imagen.height;
          canvas.getContext("2d")?.drawImage(imagen, 0, 0);
          canvas.toBlob(
            (blob) => {
              if (blob === null) {
                return reject(blob);
              } else {
                resolve(blob);
              }
            },
            file.type,
            quality / 100
          );
        };
        imagen.src = URL.createObjectURL(file);
    });
}

export const encodeFilesToBase64 = (file: Blob) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async() => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
};

export const decodeBase64ToFile = (base64Data: string, defaultFileName = 'file') => {
  // Función para convertir Base64 a Blob
  const base64ToBlob = (base64: string, mimeType: string) => {
      const byteCharacters = atob(base64.split(',')[1]);
      const byteArrays = [];
      
      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
          const slice = byteCharacters.slice(offset, offset + 512);
          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
      }
      
      return new Blob(byteArrays, { type: mimeType });
  };

  // Detectar el tipo MIME de la cadena Base64
  const mimeType = base64Data.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)?.[1] || 'application/octet-stream';
  
  // Crear Blob a partir de los datos Base64
  const blob = base64ToBlob(base64Data, mimeType);
  
  return new File([blob], defaultFileName+'.'+mimeType.split('/')[1], { type: mimeType });
};
