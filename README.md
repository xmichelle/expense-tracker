# expense-tracker
A web app for money-conscious individuals who need to track their expenses.

![image](https://user-images.githubusercontent.com/29046211/29437697-1ba75fdc-8367-11e7-91fd-c074202fff0a.png)

![image](https://user-images.githubusercontent.com/29046211/29437683-02ea5904-8367-11e7-94fb-ea54b0143aa5.png)

## Setup
Install [Git](https://git-scm.com/), [Node](https://nodejs.org/en/), and [Brew](https://brew.sh/).

    $ git clone https://github.com/xmichelle/expense-tracker.git
    $ cd expense-tracker
    $ npm install
    $ brew install postgresql
    $ brew services start postgresql
    $ createuser [username]
    $ createdb -O [owner] expenses
    $ npm run watch

Navigate to [http://localhost:3000/](http://localhost:3000/) in your browser.


## Technologies Used
  * [Express](https://expressjs.com/)
  * [PostgreSQL](https://www.postgresql.org/)
  * [Chart.js](http://www.chartjs.org/)
