import os, sys
import traceback
from PIL import Image

imagePath = sys.argv[1]
imageName = os.path.split(imagePath)[1]

outputDir = sys.argv[4]
outfile = os.path.join(outputDir, imageName)

maxSize = int(sys.argv[2]), int(sys.argv[3])

try:
  image = Image.open(imagePath)
  image.thumbnail(maxSize, Image.ANTIALIAS)
  image.save(outfile, "JPEG")
except IOError:
    print ("cannot create thumbnail for '%s'" % imagePath)
    traceback.print_exc()