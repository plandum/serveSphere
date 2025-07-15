export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
};

export type IUpdateUser = {
  userId: string;
  fullName: string;
  //lastName: string;
  bio: string;
  imageId: string;
  imageUrl: URL | string;
  file: File[];
};

export type INewProduct = {
  userId: string;
  productName: string;
  productPrice: string;
  productDescription: string;
  productCategory : string;
  productFile: File[];
  location?: string;
  imageId: string;
  imageUrl: string;
};

export type IUpdateProduct = {
  productId: string;
  productName: string;
  productPrice: string;
  productDescription: string;
  productCategory : string;
  productFile: File[];
  location?: string;
  imageId: string;
  imageUrl: string;
};

export type IUser = {
  id: string;
  fullName: string;
  //lastName: string;
  username: string;
  email: string;
  imageId: string;
  imageUrl: string;
  bio: string;
};

export type INewUser = {
  fullName: string;
  //lastName: string;
  email: string;
  username: string;
  password: string;
};
