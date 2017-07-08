import { IUser } from '../user/user';

export interface ITweet {
  created_at: string;
  entities : IEntities;
  id_str: string;
  user: IUser;
}

interface IEntities {
  media: IMediaArray;
}

interface IMediaItem {
    media_url: '',
    media_url_https: '',
    type: ''
}

type IMediaArray = IMediaItem[];
