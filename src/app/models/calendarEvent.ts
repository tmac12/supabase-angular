export interface CalendarEvent {
  id: number | undefined;
  created_at: Date;
  title: string;
  start_timestamp: Date; //maybe Date with only time in typescript?
  end_timestamp: Date;
  owner_id: string | undefined;
  shared_with: string | undefined;
  shift_id: number | undefined;
}
