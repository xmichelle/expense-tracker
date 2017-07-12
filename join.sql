SELECT expenditures.category_id, categories.name
  FROM categories
  JOIN expenditures
    ON (expenditures.category_id = categories.id);
