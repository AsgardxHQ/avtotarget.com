import { settings } from '@/stores/settings';

export const uploadImg = async (e:any, data:any, path:string, key:string) => {
  const store = settings();
  let rawImg;
  const reader = new FileReader()
  reader.onloadend = () => {
    rawImg = reader.result;
    data.temporaryImg = rawImg;
  }
  const file = e.files[0];
  data.file = file;
  if(file.size / 1024 > 512) {
    store.uploader.error = 'Изображение не должно превышать 512kb.'
  }
  reader.readAsDataURL(e.files[0]);
  const formData = new FormData();
  formData.append('file', file);
  const res:any = await useAsyncData('file-upload', () =>
    // -- /api/upload/car?itemType=products&fileType=images
    $fetch(path, { method: 'POST', body: formData })
  );

  if(typeof data[key] !== 'string') {
    data[key].push(res.data.value.response);
  } else {
    data[key] = res.data.value.response;
  }
  
  store.uploader.success = 'Загрузка изображения успешна!';
}