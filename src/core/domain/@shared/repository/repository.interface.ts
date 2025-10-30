export interface RepositoryInterface<T> {
  create(data: T): Promise<void>;
  findOne(id: string): Promise<T>;
  findAll(): Promise<T[]>;
  update(data: T): Promise<T>;
  delete(id: string): Promise<void>;
}
