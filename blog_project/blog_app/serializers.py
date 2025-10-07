from rest_framework import serializers
from .models import  Comments, Post, SavedPost, User


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'slug', 'content', 'created_at', 'published', 'count_likes']



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'firstName', 'lastName', 'email', 'password']



class SavedPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedPost
        fields = ['user', 'post']
        validators = [
            serializers.UniqueTogetherValidator(
                queryset=SavedPost.objects.all(),
                fields=['user', 'post'],
                message="This user has already saved this post."
            )
        ]

class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ['user', 'post', 'comment', 'created_at']
        validators = [
            serializers.UniqueTogetherValidator(
                queryset=Comments.objects.all(),
                fields=['user', 'post'],
                message="This user has already commented on this post."
            )
        ]

class LikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ['user', 'post']
        validators = [
            serializers.UniqueTogetherValidator(
                queryset=Comments.objects.all(),
                fields=['user', 'post'],
                message="This user has already liked this post."
            )
        ]