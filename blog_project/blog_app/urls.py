from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
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
]
