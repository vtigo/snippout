export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  status?: number;
};

export interface ApiErrorResponse {
  message?: string;
  error?: string;
  status?: string;
}