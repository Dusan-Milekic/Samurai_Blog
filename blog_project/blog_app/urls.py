from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CommentsViewSet, LikesViewSet, PostViewSet, SavedPostViewSet, UserViewSet

router = DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'users', UserViewSet)
router.register(r'savedposts', SavedPostViewSet)
router.register(r'comments', CommentsViewSet)
router.register(r'likes', LikesViewSet)
urlpatterns = [
    path('', include(router.urls)),
]