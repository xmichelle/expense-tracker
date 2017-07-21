DROP TABLE IF EXISTS expenditures;

CREATE TYPE transaction_type AS ENUM ('income', 'expense');

CREATE TABLE expenditures (
  id                 serial,
  user_id            integer,
  category_id        integer,
  item               text,
  transaction_date   bigint,
  amount             numeric(1000, 2),
  type               transaction_type
);
