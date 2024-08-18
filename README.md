# gendiff
Utility that shows difference between two data structures.

[![Actions Status](https://github.com/vvvhatislove/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/vvvhatislove/frontend-project-lvl2/actions)
[![CI](https://github.com/vvvhatislove/frontend-project-lvl2/workflows/CI/badge.svg)](https://github.com/vvvhatislove/frontend-project-lvl2/actions/workflows/ci.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/64eab26444939c4f7832/maintainability)](https://codeclimate.com/github/vvvhatislove/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/64eab26444939c4f7832/test_coverage)](https://codeclimate.com/github/vvvhatislove/frontend-project-lvl2/test_coverage)

<p>
  • <a href="#how-to-use">How To Use</a>
</p>
<p>
  • <a href="#supported-file-formats">Supported file formats</a>
</p>
<p>
  • <a href="#output-formats">Output formats</a>
    <ul>
      <li>stylish</li>
      <li>plain</li>
      <li>json</li>
    </ul>
</p>
 • <a href="#credits">Credits</a>

## How To Use
Run these commands from your command line:

```bash
# Clone this repository.
$ git clone https://github.com/vvvhatislove/frontend-project-lvl2

# Go to the repository.
$ cd frontend-project-lvl2

# Install dependencies.
$ npm install

# Link the package.
$ npm link

# Run this command to get info.
$ gendiff -h 

# Run this command to start tests / start tests and show coverage.
$ make test
$ make test-coverage
```

## Supported file formats
You may use this utility in order to get difference between either JSON or YAML files.

```bash
# Run this command to get difference between two files. 
# Type paths to your files instead of <filepath1> and <filepath2>. 
$ gendiff <filepath1> <filepath2>
```
[![asciicast](https://asciinema.org/a/ehcVMArUl4PEI9eHgMiv51MQd.svg)](https://asciinema.org/a/ehcVMArUl4PEI9eHgMiv51MQd)

## Output formats
You may get the difference between two files in several formats.
```bash
# Run this command to get difference between two files. 
# Type the name of format instead of <format>. 
# If you do not type any format, then the default one is chosen ("stylish"). 
$ gendiff -f <format> <filepath1> <filepath2>
```

### stylish
Default format. Shows the difference in a tree-like way. Keys are sorted in alphabetical order.
[![asciicast](https://asciinema.org/a/Ozuh8KlzYppunIgWSw78cgcWL.svg)](https://asciinema.org/a/Ozuh8KlzYppunIgWSw78cgcWL)

### plain
Shows the difference in a plain way. If new property value is complex, it is displayed as [complex value].
[![asciicast](https://asciinema.org/a/qJG1SsjNr56W71qHI4gDbnlbW.svg)](https://asciinema.org/a/qJG1SsjNr56W71qHI4gDbnlbW)

### json
Shows the difference as JSON string.
[![asciicast](https://asciinema.org/a/MUGMJkvfg8xC6tthA7sSrJt3r.svg)](https://asciinema.org/a/MUGMJkvfg8xC6tthA7sSrJt3r)

 ## Credits
This utility was created as my second project during my <a href="https://en.hexlet.io/pages/about">Hexlet</a> "Frontend-developer" education course.
