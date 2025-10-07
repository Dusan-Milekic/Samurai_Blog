from django.contrib import admin

from .models import Comments, Likes, Post, SavedPost, User

# Register your models here.
admin.site.register(Post)
admin.site.register(User)
admin.site.register(SavedPost)
admin.site.register(Comments)
admin.site.register(Likes)