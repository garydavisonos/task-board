export type CardProps = {
  label: string;
  description: string;
  deadline: string;
  id: number;
  list_id: number;
  completed: boolean;
  created_at?: Date;
  updated_at?: Date;
};
