CREATE TABLE expenditures (
  id                 serial,
  category_id        integer,
  item               text,
  transaction_date   date,
  cost_amount        numeric(1000, 2)
);

/*SELECT TO_CHAR(date, 'Mon dd, yyyy');*/

SELECT * FROM expenditures
