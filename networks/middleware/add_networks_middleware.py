from networks.models import Network

class AddNetworksMiddleware(object):
    # Check if client IP is allowed
    def process_request(self, request):

        if request.user.is_active == True:

            request.user_networks = Network.objects.filter(assigned_user=request.user)

        return None