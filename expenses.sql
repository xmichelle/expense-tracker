DROP TABLE IF EXISTS expenditures;

CREATE TABLE expenditures (
  id                 serial,
  user_id            integer,
  category_id        integer,
  item               text,
  transaction_date   numeric,
  amount             numeric(1000, 2)
);

/*SELECT TO_CHAR(date, 'Mon dd, yyyy');*/

/*SELECT * FROM expenditures;*/
