# Assignment documentation
## Backend
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
    - Commands to create the tables:
      ```SQL
      CREATE EXTENSION pgcrypto;
      
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(40),
        created_at VARCHAR(10),
        password TEXT NOT NULL
      );

      CREATE TABLE posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(40),
        content TEXT,
        created_by integer,
        created_at VARCHAR(10)
      );
      ```
      
    - Command to enable pgcrypto for encrypting passwords on insert:
      ```SQL
      CREATE EXTENSION pgcrypto;
      ```
    
  - **Endpoints:**
    API documentation is already provided [here](https://documenter.getpostman.com/view/4996575/TVssjTxh#e73b45ad-1e89-4588-aaa1-321f53eebf1c)

  - **Execute:**
    Install the dependencies and run the code either following this command:
      ```bash
      cd ./backend
      npm install
     node index.js
      ```
    Or by creating a systemd service (i.e. `/lib/systemd/system/node-app.service`) and fill using:
    ```service
    [Unit]
    Description=node-app
    [Service]
    Type=simple
    Restart=always
    RestartSec=5s
    #Environment=PORT=80
    Environment=PGUSER=youruser
    Environment=PGHOST=yourhost
    Environment=PGPASSWORD=yourpassword
    Environment=PGDATABASE=yourdb
    Environment=PGPORT=5432
    ExecStart=/usr/bin/node /path/to/code/backend/index.js

    [Install]
    WantedBy=multi-user.target
    ```
    and run using:
    ```bash
    systemctl start node-app
    ```
## Nginx
Configurations are be available in [`nginx.conf`](./nginx.conf).
request urls starting with /api are proxied to the port that app is listening on:
  ```nginx
  location /api/ {
      proxy_pass http://localhost:3000;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header Host $host;
  }
  ```
