import sys
from PIL import Image

maxSize = int(sys.argv[1]), int(sys.argv[2])

try:
  image = Image.open(sys.stdin.buffer)
  image.thumbnail(maxSize, Image.ANTIALIAS)
  image.save(sys.stdout.buffer, "JPEG")
except Exception:
  import traceback
  sys.stderr.write("cannot create thumbnail for file being written to")
  sys.stderr.write("\n\n")
  originalStdout = sys.stdout
  sys.stdout = sys.stderr
  traceback.print_exc()
  sys.stdout = originalStdout
