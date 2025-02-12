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

# Step 3: Serve React Frontend Using Django
# Move React build files into Django static folder
RUN mkdir -p /app/backend/staticfiles
COPY --from=frontend /app/frontend/build/ /app/backend/staticfiles/

# Expose necessary ports
EXPOSE 10000

# Start Django Backend & Serve React Frontend
CMD python manage.py collectstatic --noinput && \
    python manage.py migrate && \
    python manage.py runserver 0.0.0.0:10000
