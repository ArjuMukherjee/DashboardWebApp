# Step 1: Build React Frontend
FROM node:18 AS frontend
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Step 2: Setup Python for Django Backend
FROM python:3.9 AS backend
WORKDIR /app/backend
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/ .

# Step 3: Setup Nginx + Gunicorn (Final Stage)
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy React build files to Nginx static folder
COPY --from=frontend /app/frontend/build/ .

# Copy Django backend to /backend
COPY --from=backend /app/backend /backend

# Copy Nginx configuration file
COPY backend/nginx.conf /etc/nginx/conf.d/default.conf

# Expose necessary ports
EXPOSE 80

# Start Gunicorn (Django) and Nginx
CMD gunicorn backend.wsgi:application --bind 0.0.0.0:8000 & nginx -g "daemon off;"
