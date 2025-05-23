// src/types/apiTypes.ts

// ✅ حالة الصنف (Status)
export type ItemStatuses = {
  id: string;
  name: string;
  code: string;
  iconUrl: string;
};

// ✅ صنف واحد كامل
export type Item = {
  itemNo: string;
  name: string;
  firstImage: string;
  groupId: string;
  subOneId: string;
  subTwoId?: string;
  subThreeId?: string;
  description?: string;
  status?: ItemStatuses;
};

// ✅ العناصر المختصرة (مثلاً في القائمة)
export type GetItemsDto = {
  itemNo: string;
  name: string;
  firstImage: string;
  status: ItemStatuses | null;
};

// ✅ تفاصيل عنصر واحد
export type GetItemDto = {
  itemNo: string;
  name: string;
  description: string;
  images: string[];
  status?: ItemStatuses;
};

// ✅ نوع الصور التي سيتم رفعها (قبل الرفع)
export type UploadableImage = {
  file: File;
  previewUrl: string;
};

// ✅ بيانات الحذف - فقط اسم الصورة بدون رابط
export type DeleteImagesPayload = string[];

// ✅ بيانات تسجيل الدخول
export type LoginPayload = {
  username: string;
  password: string;
};

// ✅ التصنيفات

export type Group = {
  id: string;
  name: string;
  imageUrl: string;
};

export type SubOne = {
  id: string;
  name: string;
  imageUrl: string;
  groupId: string;
};

export type SubTwo = {
  id: string;
  name: string;
  imageUrl: string;
  groupId: string;
  subOneId: string;
};

export type SubThree = {
  id: string;
  name: string;
  imageUrl: string;
  groupId: string;
  subOneId: string;
  subTwoId: string;
};