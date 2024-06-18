# agente2/core/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import MoveSerializer
import random

class Agent2Move(APIView):
    def get(self, request, format=None):
        # Lógica para decidir la posición
        move = {'position':random.randint(0,8), 'player': 'O'}
        serializer = MoveSerializer(move)
        return Response(serializer.data)
