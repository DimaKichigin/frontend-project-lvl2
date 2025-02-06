# Difference Calculator

##### Hexlet tests and linter status:
[![Actions Status](https://github.com/DimaKichigin/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/DimaKichigin/frontend-project-lvl2/actions)

[![Maintainability](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability)](https://codeclimate.com/github/codeclimate/codeclimate/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/test_coverage)](https://codeclimate.com/github/codeclimate/codeclimate/test_coverage)

This project implements a library that can be installed as a dependency in any other NPM package. The calculator outputs the difference between two compared configuration files. The result of file comparison can be output in different formats: yaml and json. It is also possible to select the comparison format
  
The project was tested using the Jest framework. Github Actions was also used to constantly send changes to the working copy and automated build of the project. CodeClimate code analysis service was used to evaluate the code quality, detect potential problems and improve the overall cleanliness of the code base  

### Video demonstration of the whole project

[![asciicast](https://asciinema.org/a/l0jhPJTHqS2MoaxsKfZ0nF3Sy.svg)](https://asciinema.org/a/l0jhPJTHqS2MoaxsKfZ0nF3Sy)

**In this example, called up the utility help information**

````js
gendiff -h

  Usage: gendiff [options]

  Compares two configuration files and shows a difference.

  Options:
    -V, --version        output the version number
    -h, --help           output usage information
````

The help is generated automatically using a special library that simplifies the creation of command line utilities (cli). The example uses one of the most popular libraries in js, which is called *commander.js*

### Flat File Comparison (JSON)

The diff is built based on how the files have changed relative to each other, the keys are output in alphabetical order. Below is an example of what should result from this step:

``` js
gendiff filepath1.json filepath2.json

{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}

````

The absence of a plus or minus indicates that the key is in both files and its values match. In all other situations, the value of the key is either different, or the key is in only one file. In the example above, the timeout key is in both files but has different values, proxy is only in file1 and verbose is only in file2

### Comparing flat files (yaml)

Example of what you get after parsing yaml files

``` js
gendiff filepath1.yml filepath2.yml

{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```

### Recursive comparison of nested json and yaml structures 

``` js
gendiff filepath1.json filepath2.json

{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}
```

### Display the diff between two files in text readable format

``` js
gendiff --format plain filepath1.json filepath2.json

Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
```

### Displaying the diff in json format


![JSON формат](https://github.com/user-attachments/assets/1cca72eb-e26d-4038-ac9c-356cf9e41354)

