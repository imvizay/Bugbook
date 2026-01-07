from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import login
from apps.authentication.serializers import RegisterSerializer

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.save()

        # Create session automatically
        login(request, user)

        return Response({
            "message": "Account created successfully",
            "username": user.username
        })

from django.contrib.auth import authenticate
class LoginView(APIView):

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if user is None:
            return Response({"error": "Invalid credentials : user is none"}, status=400)
        
        # making django lets know this backend authenticated the user
        user.backend = "apps.authentication.backends.EmailBackend"

        login(request, user)

        return Response({
            "message": "Login successful",
            "username": user.username
        })


from django.contrib.auth import logout

from rest_framework.permissions import IsAuthenticated

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response({
            "message": "Logged out successfully"
        })
