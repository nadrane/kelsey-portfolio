# Installation
You are going to need to install PIL. I personally recommend pillow-simd. This is needed for image processing.

## OSX
    pip install pillow-simd
You might also need to install dependencies for `pillow-simd`, including `zlib` and `libjpeg`.

You will also need cjpeg for image compression. I recommend mozcjpeg for superior performance.
## OSX
    brew install mozjpeg
    brew install libpng

    ln -s /usr/local/Cellar/mozjpeg/3.0/bin/cjpeg /usr/local/bin/mozcjpeg
    ln -s /usr/local/Cellar/mozjpeg/3.0/bin/jpegtran /usr/local/bin/mozjpegtran

Be wary using these last two unix commands! They will potentially break other code that depends on the cjpeg library.