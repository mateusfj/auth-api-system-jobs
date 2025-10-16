export interface RepositoryInterface<T> {
  create(data: any): void;
  findOne(id: string): void;
  findAll(): void;
  update(data: any): void;
  delete(id: string): void;
}
