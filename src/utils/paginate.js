export default function paginate(total, page, limit) {
  const last_page = Math.ceil(total / limit);
  return {
    current_page: +page,
    per_page: +limit,
    first_page: 1,
    last_page,
    prev_page: page > 1 ? page - 1 : 1,
    next_page: page < last_page ? +page + 1 : last_page,
    total,
    has_more: +page > last_page,
  };
}
