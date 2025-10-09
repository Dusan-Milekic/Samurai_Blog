from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from blog_app.views import login, register, verify_email, LikesView, PostViewSet, UserViewSet, SavedPostViewSet, CommentsViewSet


router = DefaultRouter()
router.register(r"posts", PostViewSet.as_view(), basename='posts')
router.register(r"users", UserViewSet.as_view(), basename='users')
router.register(r"saved", SavedPostViewSet.as_view(), basename='saved')
router.register(r"comments", CommentsViewSet.as_view(), basename='comments')

urlpatterns = [
    path("api/", include(router.urls)),
    path("api/likes/", LikesView.as_view(), name="likes"),  # <-- ručno dodato
    path("api/auth/login/", login, name="login"),  # Add this line
    path("api/auth/register/",register, name="register"),  # Add this line
    path("api/verify-email/", verify_email, name="verify-email"),
]
