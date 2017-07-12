DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
  id      serial,
  name    text
);

INSERT INTO categories (name)
VALUES
  ('Transportation'),
  ('Leisure'),
  ('Groceries'),
  ('Rent'),
  ('Utilities'),
  ('Health'),
  ('Education'),
  ('Miscellaneous');
