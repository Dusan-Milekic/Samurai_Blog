from rest_framework import serializers
from .models import Post, User, SavedPost, Comments, Likes

# ---------- Post ----------
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ["id", "title", "slug", "content", "created_at", "published", "count_likes"]
        read_only_fields = ["id", "slug", "created_at", "count_likes"]

# ---------- User ----------
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # pretpostavljam da su u modelu first_name/last_name (ne camelCase)
        fields = ["id", "first_name", "last_name", "email", "password"]
        read_only_fields = ["id"]
        extra_kwargs = {
            "password": {"write_only": True, "min_length": 6},
        }

# ---------- Saved / Bookmarks ----------
class SavedPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedPost
        fields = ["user", "post"]
        validators = [
            serializers.UniqueTogetherValidator(
                queryset=SavedPost.objects.all(),
                fields=["user", "post"],
                message="This user has already saved this post.",
            )
        ]

# ---------- Comments ----------
class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ["id", "user", "post", "comment", "created_at"]
        read_only_fields = ["id", "created_at"]
        # Napomena: namerno NEMA UniqueTogetherValidator-a,
        # da bi jedan korisnik mogao da ostavi više komentara na isti post.

# ---------- Likes ----------
class LikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Likes                      # <-- ispravno: koristi Likes model
        fields = ["user", "post"]
        validators = [
            serializers.UniqueTogetherValidator(
                queryset=Likes.objects.all(),   # <-- ispravno: Like queryset
                fields=["user", "post"],
                message="This user has already liked this post.",
            )
        ]
