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

export type ItemStatuses = {
  id: string;
  name: string;
  code: string;
  iconUrl: string;
};

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

export type GetItemsDto = {
  itemNo: string;
  name: string;
  firstImage: string;
  status: ItemStatuses | null;
};

export type GetItemDto = {
  itemNo: string;
  name: string;
  description: string;
  images: string[];
  status?: ItemStatuses;
};

export type UploadableImage = {
  file: File;
  previewUrl: string;
};

export type DeleteImagesPayload = string[];

export type LoginPayload = {
  username: string;
  password: string;
};