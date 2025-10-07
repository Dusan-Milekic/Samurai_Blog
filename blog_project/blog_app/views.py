from django.shortcuts import render
from rest_framework import viewsets
from .models import Comments, Likes, Post, SavedPost, User
from .serializers import CommentsSerializer, LikesSerializer, PostSerializer, SavedPostSerializer, UserSerializer

# Create your views here.
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class SavedPostViewSet(viewsets.ModelViewSet):
    queryset = SavedPost.objects.all()
    serializer_class = SavedPostSerializer

class CommentsViewSet(viewsets.ModelViewSet):
    queryset = Comments.objects.all()
    serializer_class = CommentsSerializer

class LikesViewSet(viewsets.ModelViewSet):
    queryset = Likes.objects.all()
    serializer_class = LikesSerializer