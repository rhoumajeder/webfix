from django.shortcuts import render, redirect


# Create your views here.
def index(request):
    return render(request, 'frontend/index.html')


def view_404(request, exception=None):
    # make a redirect to homepage
    # you can use the name of url or just the plain link
    return redirect('/')
