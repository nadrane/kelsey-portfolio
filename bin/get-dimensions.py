import sys

try:
  from PIL import Image
except ImportError:
  sys.exit("You must install PIL")

try:
  image = Image.open(sys.stdin.buffer)
  width, height = image.size
  sys.stdout.write(str(width) + ',' + str(height))
except Exception:
  import traceback
  sys.stderr.write("cannot get height of image.")
  sys.stderr.write("\n\n")
  originalStdout = sys.stdout
  sys.stdout = sys.stderr
  traceback.print_exc()
  sys.stdout = originalStdout
