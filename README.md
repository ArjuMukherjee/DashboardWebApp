# DashboardWebApp
A Dashboard web application for listing courses and their instances.

##Setup Procedure
1. Download windows docker installer by clicking the url:
   [Install docker](https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe?utm_source=docker&utm_medium=webreferral&utm_campaign=docs-driven-download-win-amd64&_gl=1*1jj8yag*_gcl_au*MzIxMDQxMjA2LjE3MjQyMTMxNTc.*_ga*MTAyNDA2Mzg5MS4xNzI0MjEzMTU3*_ga_XJWPQMJYHQ*MTcyNDY2MDY0OS4xMS4xLjE3MjQ2NjA2NjYuNDMuMC4w)
2. Run the Docker Desktop Installer and finish the installation.
3. Go to the root folder **DashboardWebApp** where the **docker-compose.yaml** exists.
4. Setup the containers using the command `docker-compose up`. Servers will be running.

You can access the backend api from your [localhost:8000](http://localhost:8000/) and the frontend app from [localhost:3000](http://localhost:3000/)

##Endpoints for Backend
1. Create Course         : **POST localhost:8000/api/courses**
2. List Courses          : **GET localhost:8000/api/courses**
3. Details of a Course   : **GET localhost:8000/api/courses/{course_id}/**
4. Delete a Course       : **DELETE localhost:8000/api/courses/{course_id}/**
5. Create Instance       : **POST localhost:8000/api/instances**
6. List Instances        : **GET localhost:8000/api/instances/{year}/{semester}**
7. Details of a Instance : **GET localhost:8000/api/instances/{year}/{semester}/{course_id}**
8. Delete a Instance     : **DELETE localhost:8000/api/instances/{year}/{semester}/{course_id}**

##Routes for Frontend
1. Courses Page  : **localhost:3000/courses**
2. Instance Page : **localhost:3000/instances**
