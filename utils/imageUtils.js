const sharp = require("sharp");

const compressImage = async (imageBuffer) => {
  try {
    const compressedImage = await sharp(imageBuffer)
      .resize(800, 800, { // تغيير حجم الصورة إلى 800x800 بكسل
        fit: "inside", // الحفاظ على نسبة العرض إلى الارتفاع
        withoutEnlargement: true, // عدم تكبير الصورة إذا كانت أصغر من 800x800
      })
      .jpeg({ quality: 80 }) // ضغط الصورة بجودة 80%
      .toBuffer(); // تحويل الصورة إلى Buffer

    return compressedImage;
  } catch (error) {
    console.error("Error compressing image:", error);
    throw error;
  }
};

module.exports = { compressImage };