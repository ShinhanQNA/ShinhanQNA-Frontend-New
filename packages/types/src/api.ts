export interface ApiResponse<T> {
  resultCode: string;
  msg: string;
  data: T;
}

export interface PaginatedData<T> {
  items: T[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
