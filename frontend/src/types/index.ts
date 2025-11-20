export type ApiResponse<T> = {
  code: number;
  message: string;
  data: T;
};

export type PagedResponse<T> = {
  items: T[];
  metaData: {
    page: number;
    size: number;
    total: number;
    totalPages: number;
  };
};
