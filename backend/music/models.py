from django.db import models
from django.contrib.auth.models import User

class Artists(models.Model):
    song=models.CharField(max_length=255, primary_key = True, unique = True)
    artist=models.CharField(max_length=255)
    def __add__(self, other):
        return self.song + other
    def __str__(self):
        return self.song
class Ratings(models.Model):
    username = models.ForeignKey(User, on_delete=models.CASCADE, to_field="username", db_column="username")
    song = models.ForeignKey(Artists, on_delete=models.CASCADE)
    rating = models.IntegerField(default=0)
    artist=models.CharField(max_length=255)
    def __str__(self):
        return self.song + " by " +self.artist + " -> " + str(self.rating)

