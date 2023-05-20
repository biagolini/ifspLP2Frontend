export interface TypeModelSingle {
  id: number;
  description: string;
}

export interface TypeModelDual {
  id: number;
  abbreviation: string;
  description: string;
}

export interface TypeTimeZone {
  id: number;
  timezoneOffset: string;
  timezoneDescription: string;
}


export interface LoginModel{
  id: number;
  user: number;
  idTypeLogin: number;
  username: string;
  password: number;
  passwordDateTimeLastEdition: string;
}

export interface PhoneNumberModel{
  id: number;
  user: number;
  phoneNumber: string
  idPhoneNumberType: number;
}

export interface PictureModel{
  id: number;
  user: number;
  largeUrl: string
  mediumUrl: string;
  thumbnailUrl: string;
}

export interface  UserModel {
  id?: number;
  idTypeGender: number;
  title: string;
  firstName: string;
  lastName: string;
  idLocationType: number;
  idRegionType: number;
  street: string;
  city: string;
  idTypeState: number;
  postcode: string;
  latitude: number;
  longitude: number;
  idTypeTimezone: number;
  email: string;
  birthday: Date;
  registered: Date;
  idTypeNationality: number;
}
