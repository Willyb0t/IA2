# agente2/core/serializers.py

from rest_framework import serializers

class MoveSerializer(serializers.Serializer):
    position = serializers.IntegerField()
    player = serializers.CharField(max_length=1)
