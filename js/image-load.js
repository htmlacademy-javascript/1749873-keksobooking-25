const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const avatar = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const images = document.querySelector('#images');
const imagesPreview = document.querySelector('.ad-form__photo');

avatar.addEventListener('change', () => {
  const file = avatar.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

images.addEventListener('change', () => {
  const file = images.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const imagePreview = document.createElement('img');
    imagePreview.classList.add('ad-form__photo');
    imagePreview.src = URL.createObjectURL(file);
    imagesPreview.append(imagePreview);
  }
});
