from django.urls import path

from .views import InstanceMixinView

urlpatterns = [
    path('',InstanceMixinView.as_view(),name="create-instance"),
    path('<int:year>/<int:sem>/',InstanceMixinView.as_view(),name="list-instance"),
    path('<int:year>/<int:sem>/<int:course>/',InstanceMixinView.as_view(),name="delete-detail-instance"),
]