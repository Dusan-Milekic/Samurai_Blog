from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view
from django.db import models
from .models import Post, User, SavedPost, Comments, Likes, EmailVerification
from .serializers import (
    PostSerializer,
    UserSerializer,
    SavedPostSerializer,
    CommentsSerializer,
    LikesSerializer,
)
from django.core.mail import send_mail
from django.conf import settings

# --- CSRF bypass samo za dev (da React može POST) ---
class CsrfExemptSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):
        return

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

        # vrati novi broj lajkova
        updated_likes = Post.objects.get(id=post_id).count_likes
        return Response(
            {"detail": "liked", "count_likes": updated_likes},
            status=status.HTTP_201_CREATED,
        )
    
    def get(self, request):
        likes = Likes.objects.all()
        serializer = LikesSerializer(likes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# ---------- REGISTRACIJA ----------
@api_view(["POST"])

def register(request):
    first_name = request.data.get("first_name")
    last_name = request.data.get("last_name")
    email = request.data.get("email")
    password = request.data.get("password")
    confirm_password = request.data.get("confirm_password")

    # Validacije
    if not first_name or not last_name or not email or not password:
        return Response({"error": "All fields are required"}, status=400)

    if password != confirm_password:
        return Response({"error": "Passwords do not match"}, status=400)

    if User.objects.filter(email=email).exists():
        return Response({"error": "Email already registered"}, status=400)

    try:
        # Kreiraj korisnika
        user = User.objects.create(
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password
        )
        
        # Kreiraj verification
        verification = EmailVerification.objects.create(user=user)
        
        verification_url = f"http://localhost:5173/verify-email?token={verification.verification_token}"
        
        # 🔥 POKUŠAJ DA POŠALJEŠ EMAIL
        try:
            send_mail(
                subject='🔥 Verify Your Email - Samurai Blog',
                message=f"""
                Hi {first_name}!

                Welcome to Samurai Blog Platform! 🚀

                To complete your registration, please verify your email address by clicking the link below:

                {verification_url}

                This verification link will expire in 24 hours.

                Best regards,
                The Samurai Blog Team
                                """,
                                from_email='dusanmilekic0511@gmail.com',
                                recipient_list=[email],
                                fail_silently=False,
                            )
                
            print(f"✅ Email sent successfully to: {email}")
            email_status = "Email sent successfully! Please check your inbox."
            
        except Exception as email_error:
            print(f"❌ Email sending failed: {email_error}")
            email_status = f"Registration successful, but email failed to send. Verification link: {verification_url}"
        
        print(f"🔍 User created: {user.email}")
        print(f"🔍 Verification token: {verification.verification_token}")
        print(f"🔍 Verification URL: {verification_url}")
        
        return Response({
            "message": email_status,
            "success": True,
            "verification_url": verification_url  # Za backup
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        print(f"❌ Registration error: {e}")
        return Response({
            "error": f"Registration failed: {str(e)}"
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# ---------- EMAIL VERIFIKACIJA ----------
@api_view(["GET"])
def verify_email(request):
    token = request.query_params.get("token")
    
    if not token:
        return Response({
            "error": "Verification token required"
        }, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        verification = EmailVerification.objects.get(verification_token=token)
        
        if verification.is_verified:
            return Response({
                "message": "Email already verified",
                "success": True
            }, status=status.HTTP_200_OK)
        
        # 🔥 OZNAČI EMAIL KAO VERIFIKOVANO
        verification.is_verified = True
        verification.save()
        
        # 🔥 AKTIVIRAJ KORISNIKA I VERIFIKUJ EMAIL
        user = verification.user
        user.is_active = True  # 🔥 DODAJ OVO!
        user.save()
        
        print(f"🔍 Email verified for: {user.email}")
        
        return Response({
            "message": "Email verified successfully! You can now log in.",
            "success": True,
            "user": {
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name
            }
        }, status=status.HTTP_200_OK)
        
    except EmailVerification.DoesNotExist:
        return Response({
            "error": "Invalid or expired verification token"
        }, status=status.HTTP_400_BAD_REQUEST)

# ---------- LOGIN ----------
@api_view(["POST"])
def login(request):
    email = request.data.get("email")
    password = request.data.get("password")
    
    if not email or not password:
        return Response({"error": "Email and password required"}, status=400)
    
    try:
        user = User.objects.get(email=email, password=password)
          # 🔥 PROVERI DA LI JE KORISNIK AKTIVAN
        if not user.is_active:
            return Response({
                "error": "Please verify your email before logging in. Check your email for verification link."
            }, status=400)
        # 🔥 PROVERI DA LI JE EMAIL VERIFIKOVAN
        try:
            verification = EmailVerification.objects.get(user=user)
            if not verification.is_verified:
                return Response({
                    "error": "Please verify your email before logging in"
                }, status=400)
        except EmailVerification.DoesNotExist:
            # Ako nema verification record, smatra se verifikovanim (stari korisnici)
            pass
        
        return Response({
            "message": "Login successful",
            "success": True,
            "user": {
                "id": user.id,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name
            }
        }, status=status.HTTP_200_OK)
        
    except User.DoesNotExist:
        return Response({
            "error": "Invalid email or password"
        }, status=400)