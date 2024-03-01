export interface Shift {
  id: number | undefined;
  created_at: string;
  name: string;
  start_time: string; //maybe Date with only time in typescript?
  end_time: string;
  color: string;
  owner_id: string | undefined;
}
