from django.contrib import admin
from .models import Course, Instance

# Register your models here.
admin.site.register(Instance)
admin.site.register(Course)