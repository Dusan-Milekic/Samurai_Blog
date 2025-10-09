from django.urls import path, include
from rest_framework.routers import DefaultRouter
import views  # Make sure to import your views

from views import (
    PostViewSet,
    UserViewSet,
    SavedPostViewSet,
    CommentsViewSet,
    LikesView,
)

router = DefaultRouter()
router.register("posts", PostViewSet)
router.register("users", UserViewSet)
router.register("saved", SavedPostViewSet)
router.register("comments", CommentsViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("likes/", LikesView.as_view(), name="likes"),  # <-- ručno dodato
    path("auth/login/", views.login, name="login"),  # Add this line
    path("auth/register/", views.register, name="register"),  # Add this line
    path('verify-email/', views.verify_email, name='verify-email'),
]
