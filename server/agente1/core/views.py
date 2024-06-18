# agente1/core/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import MoveSerializer
import random 

class Agent1Move(APIView):
    def get(self, request, format=None):
        # Lógica para decidir la posición
        move = {'position': random.randint(0,8), 'player': 'X'}
        serializer = MoveSerializer(move)
        return Response(serializer.data)
