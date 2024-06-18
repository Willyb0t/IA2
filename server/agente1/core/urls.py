# agente1/core/urls.py

from django.urls import path
from .views import Agent1Move

urlpatterns = [
    path('move/', Agent1Move.as_view(), name='agent2-move'),
]
