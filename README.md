lessw
=====

Watch and compile less files

## Install

```
npm install lessw -g
```

## Usage

```
$ lessw path/to/file.less -o path/to/file.css -w path/to/files/**/*.less
```

### Arguments

First argument is the path the the LESS entry file.

Other values

* `-o, --output` - the file to write the css to
* `-w, --watch` - a file glob of files to watch in order to trigger the LESS compiling

