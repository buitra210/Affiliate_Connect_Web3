import { RTTwitterFollowerLocation } from "@centic-scoring/api/services/user-explore";
import countryFlag from "@centic-scoring/assets/country-flag.json";
import mapJsonData from "@centic-scoring/hooks/highcharts/highchartMapWorld.json";
import html2canvas from "html2canvas";
import { lowerCase } from "lodash";

export const urltoFile = (url: string, filename: string, mimeType: string) => {
  return fetch(url)
    .then(function (res) {
      return res.arrayBuffer();
    })
    .then(function (buf) {
      return new File([buf], filename, { type: mimeType });
    });
};
export const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const getCountryFlag = (countryCode: string) => {
  const result = countryFlag.find((flag) => {
    return flag.code === countryCode || flag.name === countryCode;
  });
  return `/${result?.flag_4x3}`;
};

export const checkExsistedCountryInJson = (
  dataInput: RTTwitterFollowerLocation,
  currentItem: (typeof mapJsonData.objects.default.geometries)[0]
) => {
  return (
    dataInput![lowerCase(currentItem.properties["country-abbrev"] || "")] ||
    dataInput![lowerCase(currentItem.properties["name"] || "")] ||
    dataInput![lowerCase(currentItem.properties["hc-a2"] || "")] ||
    dataInput![lowerCase(currentItem.properties["hc-key"] || "")] ||
    dataInput![lowerCase(currentItem.properties["iso-a3"] || "")] ||
    dataInput![lowerCase(currentItem.properties["iso-a2"] || "")]
  );
};

export const generateImageFromComponentID = async (componentID: string) => {
  const element = document.getElementById(componentID);
  if (element) {
    const canvas = await html2canvas(element);
    if (canvas) {
      const previewImage = canvas.toDataURL("image/png");
      return previewImage;
    }
  }
};

export const resizeImage = async (
  image: string,
  ratio: number,
  fillColor?: string,
  croping?: number
) => {
  const maxHeight = 2048;
  const maxWidth = 4096;
  var img = new Image();
  const crop = croping || 0;
  img.src = image;
  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
  });
  var canvas = document.createElement("canvas"),
    ctx = canvas.getContext("2d");
  // Calculate the aspect ratios

  const imgAspectRatio = img.width / img.height;
  const canvasAspectRatio = ratio;

  // Determine the scaling factor and dimensions
  let drawWidth, drawHeight, offsetX, offsetY, imgWidthScaled, imgHeightScaled;

  if (imgAspectRatio > canvasAspectRatio) {
    // Image is wider than the canvas
    drawWidth = Math.min(img.width, maxWidth);
    imgWidthScaled = drawWidth;
    imgHeightScaled = (imgWidthScaled * img.height) / img.width;
    drawHeight = drawWidth / ratio;
    offsetX = 0;
    offsetY = (drawHeight - (img.height * drawWidth) / img.width) / 2;
  } else {
    // Image is taller than the canvas
    drawHeight = Math.min(img.height, maxHeight);
    imgHeightScaled = drawHeight;
    imgWidthScaled = (imgHeightScaled * img.width) / img.height;
    drawWidth = drawHeight * ratio;
    offsetX = (drawWidth - (img.width * drawHeight) / img.height) / 2;
    offsetY = 0;
  }
  canvas.width = drawWidth;
  canvas.height = drawHeight;
  if (fillColor) {
    if (ctx) {
      ctx.rect(0, 0, drawWidth, drawHeight);
      ctx.fillStyle = fillColor;
      ctx.fill();
    }
  }
  ctx?.drawImage(
    img,
    crop,
    crop,
    img.width - 2 * crop,
    img.height - 2 * crop,
    offsetX,
    offsetY,
    imgWidthScaled,
    imgHeightScaled
  );
  return canvas.toDataURL("image/png", 1);
};

export const dataUrlToFileList = (dataUrls: string[], fileNames: string[]): FileList => {
  const fileArray: File[] = [];

  for (let index = 0; index < dataUrls.length; index++) {
    const dataUrl = dataUrls[index];
    const fileName = fileNames[index];
    // Converting content to Blob
    const blobObject = dataUrlToBlob(dataUrl);
    // Converting Blob to file
    const file = new File([blobObject], fileName);
    fileArray.push(file);
  }

  // Converting array with file to filelist and passing to uploader
  return fileArray as unknown as FileList; // < -------------- MAGIC HAPPENS HERE
};

//base 64 to blob object
export const dataUrlToBlob = (dataUrl: string): Blob => {
  // convert base64 to raw binary data held in a string
  const byteString = atob(dataUrl.split(",")[1]);

  // separate out the mime component
  const mimeString = dataUrl.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  const ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  const blob = new Blob([ia], { type: mimeString });
  return blob;
};
