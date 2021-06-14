interface Utils<T> {
  create: () => Promise<T | null>;
  read: () => Promise<T | null>;
  update: () => Promise<T | null>;
  delete: () => Promise<T | null>;
}
