export default interface Order {
  index: number;
  id: number;
  user_id: number;
  total_amount: number;
  status: string;
  created_at: string;
  link: string;
}
