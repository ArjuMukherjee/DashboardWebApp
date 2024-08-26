from rest_framework import serializers
from .models import Course, Instance
from datetime import date


class CourseDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = [
            'title',
            'code',
            'description'
        ]
    def validate_title(self, value):
        if(len(value)<=100 and value.replace(' ','').isalnum()):
            return value
        raise serializers.ValidationError("Course title is not proper!")
    def validate_code(self,value):
        if(len(value)==6 and value[:2].isalpha() and value[2]==' ' and value[3:].isnumeric()):
            return value
        raise serializers.ValidationError("Course code is not formatted correctly!")

class CourseListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = [
            'id',
            'title',
            'code',
        ]


class InstanceListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instance
        fields = [
            'id',
            'year',
            'semester',
            'course',
            'course_title',
            'course_code',
        ]
    def validate_year(self,value):
        curr_date = date.today().year
        print(curr_date)
        if(value>=curr_date and value<=(curr_date+5)):
            return value
        raise serializers.ValidationError("Provide the current year or any year within 5 years in the future!")

class InstanceDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instance
        fields = [
            'id',
            'year',
            'semester',
            'course_title',
            'course_code',
            'course_description'
        ]
