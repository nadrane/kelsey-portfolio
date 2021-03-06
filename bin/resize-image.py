import sys

try:
  from PIL import Image
except ImportError:
  sys.exit("You must install PIL")

maxSize = int(sys.argv[1]), int(sys.argv[2])

try:
  image = Image.open(sys.stdin.buffer)
  image.thumbnail(maxSize, Image.ANTIALIAS)
  image.save(sys.stdout.buffer, "JPEG")
except Exception:
  import traceback
  sys.stderr.write("cannot create thumbnail for file being written to")
  originalStdout = sys.stdout
  sys.stdout = sys.stderr
  sys.stderr.write("\n\n")
  traceback.print_exc()
  sys.stdout = originalStdout
