DROP TABLE IF EXISTS expenditures;

CREATE TABLE expenditures (
  id                 serial,
  user_id            integer,
  category_id        integer,
  item               text,
  transaction_date   bigint,
  amount             numeric(1000, 2)
);
