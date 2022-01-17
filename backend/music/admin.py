from django.contrib import admin
from .models import Ratings, Artists
from django.contrib.auth.models import User
# Register your models here.


class ArtistsAdmin(admin.ModelAdmin):
    list_display = ("song", "artist")
class RatingsAdmin(admin.ModelAdmin):
    list_display = ("username", "song", "rating","artist")



admin.site.register(Artists, ArtistsAdmin)
admin.site.register(Ratings, RatingsAdmin)

