export const normalizeFilters = filters => {
  return {
    name_filter: filters?.name_filter ? `%${filters.name_filter}%` : null,
    status_filter: filters.status_filter ? filters.status_filter : null,
  };
};
