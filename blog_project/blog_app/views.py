from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view
from django.db import models  # ✅ ispravljeno
from .models import Post, User, SavedPost, Comments, Likes
from .serializers import (
    PostSerializer,
    UserSerializer,
    SavedPostSerializer,
    CommentsSerializer,
    LikesSerializer,
)

# --- CSRF bypass samo za dev (da React može POST) ---
class CsrfExemptSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):
        return  # ne proverava CSRF token — koristi samo u dev

# ---------- POSTOVI ----------
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by("-created_at")
    serializer_class = PostSerializer
    permission_classes = [AllowAny]
    filterset_fields = ["published"]
    search_fields = ["title", "content"]
    ordering_fields = ["created_at", "count_likes"]

# ---------- KORISNICI ----------
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

# ---------- SAČUVANI POSTOVI ----------
class SavedPostViewSet(viewsets.ModelViewSet):
    queryset = SavedPost.objects.all()
    serializer_class = SavedPostSerializer
    permission_classes = [AllowAny]

# ---------- KOMENTARI ----------
class CommentsViewSet(viewsets.ModelViewSet):
    queryset = Comments.objects.all().order_by("-created_at")
    serializer_class = CommentsSerializer
    permission_classes = [AllowAny]

# ---------- LAJKOVI ----------
class LikesView(APIView):
    authentication_classes = [CsrfExemptSessionAuthentication]
    permission_classes = [AllowAny]
    serializer_class = LikesSerializer
    def post(self, request):
        user_id = request.data.get("user")
        post_id = request.data.get("post")

        if not user_id or not post_id:
            return Response({"detail": "user and post required"}, status=400)

        like, created = Likes.objects.get_or_create(user_id=user_id, post_id=post_id)
        if not created:
            return Response({"detail": "already liked"}, status=200)

        # povećaj count_likes u postu
        Post.objects.filter(id=post_id).update(count_likes=models.F("count_likes") + 1)

        # (opciono) vrati novi broj lajkova
        updated_likes = Post.objects.get(id=post_id).count_likes
        return Response(
            {"detail": "liked", "count_likes": updated_likes},
            status=status.HTTP_201_CREATED,
        )
    def get(self,request):
        likes = Likes.objects.all()
        serializer = LikesSerializer(likes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    



@api_view(["POST"])
def login(request):
    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return Response({"detail": "Email and password required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(email=email)
        if user.password != password:
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        
        # Login successful
        serializer = UserSerializer(user)
        return Response({
            "success": True,
            "user": serializer.data
        }, status=status.HTTP_200_OK)
        
    except User.DoesNotExist:
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)