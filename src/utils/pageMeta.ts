export interface PageOptions {
 page: number;
 limit: number;
}

export interface IPageFilter {
 limit?: number;
 page?: number;
 startDate?: Date;
 endDate?: Date;
 status?: string;
 searchTerm?: string;
 type?: string;
}

export class PageMeta {
 readonly page: number;
 readonly limit: number;
 readonly itemCount: number;
 readonly pageCount: number;
 readonly hasPreviousPage: boolean;
 readonly hasNextPage: boolean;

 constructor(pageOptions: PageOptions, itemCount: number) {
  this.page = pageOptions?.page;
  this.limit = pageOptions?.limit;
  this.itemCount = itemCount;
  this.pageCount = Math.ceil(this.itemCount / this.limit);
  this.hasPreviousPage = this.page > 1;
  this.hasNextPage = this.page < this.pageCount;
 }
}
