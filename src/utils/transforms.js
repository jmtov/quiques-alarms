export const normalizeFilters = filters => {
  return {
    name_filter: filters?.nameFilter ? `%${filters.nameFilter}%` : null,
    status_filter: filters.statusFilter ? filters.statusFilter : null,
  };
};
