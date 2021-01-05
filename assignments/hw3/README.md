# Assignment documentation
## Part I: Backend
  - **Database:**
  In this project we used [PostgreSQL](https://www.postgresql.org/) and package [`pg`](https://www.npmjs.com/package/pg) for connecting it to API.
    - Tables:
      - Users: (password is stored encrypted using `pgcrypto` module)
        | id | email | created_at | password |
        |----|-------|------------|----------|
        |    |       |            |          |
      - Posts:
        | id | title | content | created_by | created_at |
        |----|-------|---------|------------|------------|
        |    |       |         |            |            |
  - **Endpoints:**
    API documentation is already provided [here](https://documenter.getpostman.com/view/4996575/TVssjTxh#e73b45ad-1e89-4588-aaa1-321f53eebf1c)
## Part II: Frontend

## Part III: Nginx
configurations will be available in `nginx.conf`
