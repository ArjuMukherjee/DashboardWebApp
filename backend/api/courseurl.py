from django.urls import path

from .views import CourseMixinView

urlpatterns = [
    path('',CourseMixinView.as_view(),name="list-create-course"),
    path('<int:pk>/',CourseMixinView.as_view(),name="delete-detail-course"),
]