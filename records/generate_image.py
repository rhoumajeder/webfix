# Importing the PIL library
from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont
import os, random 
import string
# Open an Image
link_image = 'card.png'
link_image = 'plane.png'

Ads ={
      "plane" :True,
      "date":"Tuesday 30 November 2021",
      "depart": "Alsace, France",
      "destination": "Auvergne, France",
      "max_weight": "13",
      "min_price": "23",
      "f": True,
      "M":False,
      "SE":False,
      "SA": True,
      "V": True,
      "BM": False,
      "BE": True,
      "Autres": False

                 }

Color = {"red" : (255, 0, 0), "green" : (102, 175, 50) }
def VX(Ads,key):
    return "V" if Ads[key] else "X"
def RG(Ads,key):
     return Color["green"] if Ads[key] else Color["red"]
def rd_string():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=15))

def Create_imagefrom_ad(Ads):
    
    link_for_card = "card.PNG"
    link_for_plane = "plane.png"

    img = Image.open(link_for_plane if Ads["plane"] else link_for_card )


    # Call draw Method to add 2D graphics in an image
    I1 = ImageDraw.Draw(img)
    # Custom font style and font size
    myFontbd = ImageFont.truetype('arialbd.ttf', 18)
    myFont = ImageFont.truetype('arial.ttf', 18)


    # Add Text to an image
    I1.text((300, 60), Ads["date"], font=myFontbd, fill =(0, 0, 0))
    I1.text((838, 57), Ads["min_price"], font=myFontbd, fill =(0, 0, 0))
    I1.text((850, 80), Ads["max_weight"], font=myFontbd, fill =(0, 0, 0))
    I1.text((323, 94), Ads["destination"], font=myFont, fill =(0, 0, 0))
    I1.text((323, 125),Ads["depart"], font=myFont, fill =(0, 0, 0))


    I1.text((347, 175), VX(Ads,"f") , font=myFontbd, fill = RG(Ads,"f") )
    I1.text((483, 175), VX(Ads,"M"), font=myFontbd, fill =  RG(Ads,"M") )
    I1.text((646, 175), VX(Ads,"SE"), font=myFontbd, fill = RG(Ads,"SE") )
    I1.text((815, 175), VX(Ads,"SA"), font=myFontbd, fill = RG(Ads,"SA") )

    I1.text((386, 209), VX(Ads,"V"), font=myFontbd, fill = RG(Ads,"V") )
    I1.text((539, 209), VX(Ads,"BM"), font=myFontbd, fill = RG(Ads,"BM") )
    I1.text((684, 209), VX(Ads,"BE"), font=myFontbd, fill = RG(Ads,"BE") )
    I1.text((769, 209), VX(Ads,"Autres"), font=myFontbd, fill = RG(Ads,"Autres") )



    # Display edited image
    name = rd_string() + "Ads_image.png"
    img.save(name)
    return name,img
    
output = Create_imagefrom_ad(Ads)
# from IPython.display import Image
# Image(filename= output)
## don't forget to delete the object  os.remove('car2k.png')