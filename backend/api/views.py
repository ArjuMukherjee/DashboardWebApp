# from django.shortcuts import render
from rest_framework import generics, mixins
from .models import Course, Instance
from .serializers import *
from django.core.exceptions import BadRequest
# Create your views here.
class CourseMixinView(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.DestroyModelMixin,
    generics.GenericAPIView
    ):
    queryset = Course.objects.all()
    serializer_class = CourseDetailSerializer
    lookup_field = 'pk'

    def get(self, request, *args, **kwargs):
        params = kwargs.get("pk")
        if params is not None:
            return self.retrieve(request, *args, **kwargs)
        return self.list(request, *args, **kwargs)
    
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
    
    def get_serializer_class(self, *args, **kwargs):
        slr = super().get_serializer_class(*args, **kwargs)
        params = None
        try:
            params = self.kwargs["pk"]
        except:
            pass
        if params is None and self.request.method=="GET":
            return CourseListSerializer
        return slr

class InstanceMixinView(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.DestroyModelMixin,
    generics.GenericAPIView
    ):
    queryset = Instance.objects.all()
    serializer_class = InstanceListSerializer
    lookup_field = 'course'

    def get(self, request, *args, **kwargs):
        try:
            course_id = self.kwargs['course']
            return self.retrive(request, *args, **kwargs)
        except:
            return self.list(request, *args, **kwargs)
    
    def post(self, request, *args, **kwargs):
        params = self.kwargs
        if len(params)==0:
            return self.create(request, *args, **kwargs)
        else:
            raise BadRequest("Invalid request!")
    
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
    
    def get_queryset(self, *args, **kwargs):
        qs = super().get_queryset(*args, **kwargs)
        request = self.request
        try:
            year = self.kwargs["year"]
            sem = self.kwargs["sem"]
            return qs.filter(year=year,semester=sem)
        except:
            return qs
        
    def get_serializer_class(self, *args, **kwargs):
        slr = super().get_serializer_class(*args, **kwargs)
        params = None
        try:
            params = self.kwargs["course"]
            return InstanceDetailSerializer
        except:
            return slr