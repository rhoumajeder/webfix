from io import BytesIO
from PIL import Image
from django.core.files.base import ContentFile
import string
import random




#generate random string 
def id_generator(size=8, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))

#compress images 
def compress(image):
        im = Image.open(image)
        # create a BytesIO object
        im_io = BytesIO() 
        # save image to BytesIO object
        width, height = im.size
        while(width  > 768 and height > 768 ):
            width = width // 2
            height = height // 2 
        im = im.resize([width,height])
        im = im.convert("RGB")
        im =  im.save(im_io, format='JPEG', quality=70)
        # im = im.save(im_io,'JPEG', quality=70) 
        # create a django-friendly Files object
        new_image = ContentFile(im_io.getvalue(), id_generator() + '.jpg')
        return new_image