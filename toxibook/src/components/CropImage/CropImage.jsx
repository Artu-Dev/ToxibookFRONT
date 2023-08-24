import { useCallback, useState } from "react"
import Cropper from "react-easy-crop"

const createImg = async (url) => {
	return new Promise((resolve, reject) => {
		const image = new Image()
		image.addEventListener('load', () => resolve(image))
		image.addEventListener('error', (error) => reject(error))
		image.src = url
	})
}

export async function getCroppedImg(imageSrc, pixelCrop, imageName) {
	const image = await createImg(imageSrc)
	const canvas = document.createElement('canvas')
	const ctx = canvas.getContext('2d')

	if (!ctx) {
		return null
	}

	canvas.width = pixelCrop.width
	canvas.height = pixelCrop.height

	ctx.translate(image.height / 2, image.width / 2);
	ctx.translate(-image.height / 2, -image.width / 2)

	ctx.drawImage(image, -pixelCrop.x, -pixelCrop.y);


	const croppedCanvas = document.createElement('canvas')

	const croppedCtx = croppedCanvas.getContext('2d')

	if (!croppedCtx) {
		return null
	}

	croppedCanvas.width = pixelCrop.width
	croppedCanvas.height = pixelCrop.height

	croppedCtx.drawImage(
		canvas,
		pixelCrop.x,
		pixelCrop.y,
		pixelCrop.width,
		pixelCrop.height,
		0,
		0,
		pixelCrop.width,
		pixelCrop.height
	)

	// return canvas.toDataURL('image/jpeg');

	return new Promise((resolve, reject) => {
		canvas.toBlob((blob) => {
			const fileName = `${imageName}${Date.now()}`;
			const file = new File([blob], fileName, { type: "image/jpeg" });
			resolve(file)
		}, "image/jpeg");
	})

}

export const CropImage = ({imageFile, aspect, onFinish, onCancel, imageName}) => {
  const [croppedAreaPixels, setCroppedAreaPixels] = useState({ width: 0, height: 1 });
  const [croppedArea, setCroppedArea] = useState({ width: 0, height: 1 });

	const [crop, setCrop] = useState({x: 0, y: 0});
	const [zoom, setZoom] = useState(1);

	const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
		setCroppedArea(croppedArea)
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
	
  async function showCroppedImage() {
    const imageCropped = await getCroppedImg(imageFile, croppedAreaPixels, imageName);
    onFinish(imageCropped);
  }

	return (
		<>
			<button style={{ zIndex: 1 }} onClick={showCroppedImage}>
				finish
			</button>
			<button style={{ zIndex: 1 }} onClick={onCancel}>
				Cancel
			</button>
			<Cropper
				image={imageFile}
				transform={[
					`translate(${crop.x}px, ${crop.y}px)`,
					`scale(${zoom})`,
				].join(' ')}
				crop={crop}
				zoom={zoom}
				aspect={aspect}
				onCropChange={setCrop}
				onCropComplete={onCropComplete}
				onZoomChange={setZoom}
			/>
		</>
	)
}