from django.db import models

# Create your models here.
class Post(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    published = models.BooleanField(default=False)
    count_likes = models.IntegerField(default=0)

    def __str__(self):
        return self.title + " - " + str(self.count_likes) + " likes"

class User(models.Model):
    id = models.AutoField(primary_key=True)
    firstName = models.CharField(max_length=150, unique=True)
    lastName = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)


    def __str__(self):
        return self.firstName + " " + self.lastName + " - " + self.email
    
class SavedPost(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'post')
    def __str__(self):
        return f"{self.user.firstName} saved {self.post.title}"
    
class Comments(models.Model): 
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'post')

    def __str__(self):
        return f"{self.user.firstName} commented on {self.post.slug}"

class Likes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'post')

    def __str__(self):
        return f"{self.user.firstName} liked {self.post.title}"