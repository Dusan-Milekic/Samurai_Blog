from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from blog_app.views import login, register, verify_email, LikesView, PostViewSet, UserViewSet, SavedPostViewSet, CommentsViewSet


router = DefaultRouter()
router.register(r"posts", PostViewSet, basename='posts')
router.register(r"users", UserViewSet, basename='users')
router.register(r"saved", SavedPostViewSet, basename='saved')
router.register(r"comments", CommentsViewSet, basename='comments')

urlpatterns = [
    path("", include(router.urls)),
    path("likes/", LikesView.as_view(), name="likes"),  # <-- ručno dodato
    path("auth/login/", login, name="login"),  # Add this line
    path("auth/register/", register, name="register"),  # Add this line
    path('verify-email/', verify_email, name='verify-email'),
]
