export function processResponse(data) {
  return data.map(({ type, max_capacity, price }) => ({
    type: type.trim().toUpperCase(),
    maxCapacity: max_capacity,
    price,
  }));
}
