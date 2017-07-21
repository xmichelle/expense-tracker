DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
  id          serial,
  category    text
);

INSERT INTO categories (category)
VALUES
  ('Transportation'),
  ('Leisure'),
  ('Groceries'),
  ('Rent'),
  ('Utilities'),
  ('Health'),
  ('Education'),
  ('Miscellaneous'),
  ('Income');
