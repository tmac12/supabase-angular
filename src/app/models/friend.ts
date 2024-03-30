export interface Friend {
  id: string;
  owner_id: string;
  user_id: string;
  status: string;
  email: string;
}

export interface FriendDto extends Friend {
  isOwner: boolean;
}
