export interface ApiResponse<T> {
  data: T | null;
  list: T;
  message: string;
  success: boolean;
  exception: string | null;
  statusCode: number;
}
