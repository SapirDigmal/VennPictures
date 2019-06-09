export class Flicker {
  photos: Photo;

}

export class Photo {
  photo: Image[];

}

export class Image {
  id: string;
  owner: string;
  secret: string;
  server: string;
  farm: string;
  title: string;
  ispublic: number;
  isfriend: number;
  isfamily: number;
}
