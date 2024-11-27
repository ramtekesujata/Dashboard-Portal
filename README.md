
# Dashboard-Portal

This is full stack web application made using ReactJS and Django. 
It have a dashboard made using Material UI and react-charts and React-Bootstrap. 
Authentication is done using knox token



## Tech Stack

**Client:** TypeScript, ReactJs, MaterialUI, React-Bootstrap, react-chartjs-2

**Server:** Python-Django

**Server:** MySQL


## Installation

Clone Dashboard-Portal

```bash
  git clone https://github.com/kni9ht/Dashboard-Portal.git
  cd Dashboard-Portal
```

Set-up Database

```bash
  cd DB
  sudo docker-compose up
  sudo docker-compose exec  mysql-development mysql -uroot -ptesting wematter
```

Set-up Back-End

```python
  cd backend
  pip install -r requirements.txt
  python manage.py makemigrations
  python manage.py migrate
  python manage.py runserver
```

Set-up Front-End

```javascript
  cd frontend
  npm i
  npm start
```
## API Reference

#### Authentication

```http
  GET /auth/
```

| Sub-urls | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `/auth/login` | `authentication` | -- |
| `/auth/logout` | `authentication` | **Required**. Your API key |
| `/auth/register` | `authentication` | -- |


#### Fetch Data

```http
  GET /dashboard/
```

| Sub-urls | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `/dashboard/details/`      | `Data Fetching` | **Required**. Your API key |
| `/dashboard/failandpass/`      | `Data Fetching` | **Required**. Your API key |
| `/dashboard/results/`      | `Data Fetching` | **Required**. Your API key |
| `/dashboard/list/`      | `Data Fetching` | **Required**. Your API key |


