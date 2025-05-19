export type Group = {
  id: string;
  name: string;
  imageUrl: string;
};

export type SubOne = {
  id: string;
  imageUrl: string;
  name: string;
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

export type Item = {
  itemNo: string;
  name: string;
  firstImage: string;
  groupId: string;
  subOneId: string;
  subTwoId?: string;
  subThreeId?: string;
  status?: ItemStatuses;
  description?: string;
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
};

export type LoginPayload = {
  username: string;
  password: string;
};

export type ItemStatuses = {
  id: string;
  name: string;
  code: string;
  iconUrl: string;
};
