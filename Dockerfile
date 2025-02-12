# Step 1: Build React Frontend
FROM node:18 AS frontend
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Step 2: Set Up Python Environment for Backend
FROM python:3.9 AS backend
WORKDIR /app/backend
COPY backend/requirements.txt .
RUN pip install -r requirements.txt
COPY backend/ .

# Step 3: Use Gunicorn for Flask/Django + Serve Frontend via Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=frontend /app/frontend/build/ .
COPY --from=backend /app/backend /backend
COPY backend/nginx.conf /etc/nginx/nginx.conf

# Start backend
CMD gunicorn backend.wsgi:application --bind 0.0.0.0:8000 & nginx -g "daemon off;"
