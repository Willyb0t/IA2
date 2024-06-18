# agente2/core/urls.py

from django.urls import path
from .views import Agent2Move

urlpatterns = [
    path('move/', Agent2Move.as_view(), name='agent2-move'),
]
