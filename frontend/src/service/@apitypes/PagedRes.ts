export type PagedRes<T> = {
  data: T;
  page: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
};

export type PagedReq = {
  page?: number | string;
  pageSize?: number | string;
};
