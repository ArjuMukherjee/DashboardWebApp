from django.db import models
from datetime import date

class Course(models.Model):
    title       = models.CharField(max_length=100,null=False)
    code        = models.CharField(max_length=6,null=False,unique=True)
    description = models.TextField(null=True,blank=True)

class Instance(models.Model):
    semesters = [
        (1,"First"),
        (2,"second")
    ]
    year = models.IntegerField(null=False,default=date.today().year)
    semester = models.IntegerField(null=False,choices=semesters,default=1)
    course = models.ForeignKey(to="Course",on_delete=models.CASCADE)

    @property
    def course_title(self):
        return self.course.title
    @property
    def course_code(self):
        return self.course.code
    @property
    def course_description(self):
        return self.course.description