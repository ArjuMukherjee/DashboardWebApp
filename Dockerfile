FROM node:18 AS frontend
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

FROM python:3.9 AS backend
WORKDIR /app/backend
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/ .

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=frontend /app/frontend/build/ .
COPY --from=backend /app/backend /backend
COPY backend/nginx.conf /etc/nginx/conf.d/default.conf

# Start Django Backend with Gunicorn in Background & Start Nginx
CMD gunicorn backend.wsgi:application --bind 0.0.0.0:8000 & nginx -g "daemon off;"
