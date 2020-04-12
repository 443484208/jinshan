(function () {
  var _PADCHAR = "=",
    _ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    _VERSION = "1.1";
  var BASE64_MAPPING = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
    'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
    'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
    'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
    'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
    'w', 'x', 'y', 'z', '0', '1', '2', '3',
    '4', '5', '6', '7', '8', '9', '+', '/'
  ];

	/**
	 *ascii convert to binary
	 */
  var _toBinary = function (ascii) {
    var binary = new Array();
    while (ascii > 0) {
      var b = ascii % 2;
      ascii = Math.floor(ascii / 2);
      binary.push(b);
    }
		/*
		var len = binary.length;
		if(6-len > 0){
			for(var i = 6-len ; i > 0 ; --i){
				binary.push(0);
			}
		}*/
    binary.reverse();
    return binary;
  };

 var _get_chars = function(ch, y) {
    if (ch < 0x80) y.push(ch);
    else if (ch < 0x800) {
      y.push(0xc0 + ((ch >> 6) & 0x1f));
      y.push(0x80 + (ch & 0x3f));
    } else {
      y.push(0xe0 + ((ch >> 12) & 0xf));
      y.push(0x80 + ((ch >> 6) & 0x3f));
      y.push(0x80 + (ch & 0x3f));
    }
  }
	/**
	 *binary convert to decimal
	 */
  var _toDecimal = function (binary) {
    var dec = 0;
    var p = 0;
    for (var i = binary.length - 1; i >= 0; --i) {
      var b = binary[i];
      if (b == 1) {
        dec += Math.pow(2, p);
      }
      ++p;
    }
    return dec;
  };

	/**
	 *unicode convert to utf-8
	 */
  var _toUTF8Binary = function (c, binaryArray) {
    var mustLen = (8 - (c + 1)) + ((c - 1) * 6);
    var fatLen = binaryArray.length;
    var diff = mustLen - fatLen;
    while (--diff >= 0) {
      binaryArray.unshift(0);
    }
    var binary = [];
    var _c = c;
    while (--_c >= 0) {
      binary.push(1);
    }
    binary.push(0);
    var i = 0, len = 8 - (c + 1);
    for (; i < len; ++i) {
      binary.push(binaryArray[i]);
    }

    for (var j = 0; j < c - 1; ++j) {
      binary.push(1);
      binary.push(0);
      var sum = 6;
      while (--sum >= 0) {
        binary.push(binaryArray[i++]);
      }
    }
    return binary;
  };

  var __BASE64 = {
    /**
     *BASE64 Encode
     */
    encoder: function (s) {
      if (arguments.length !== 1) {
        throw "SyntaxError: exactly one argument required";
      }
    
      s = String(s);
      if (s.length === 0) {
        return s;
      }

      //s = _encode_utf8(s);
      var i,
        b10,
        y = [],
        x = [],
        len = s.length;
      i = 0;
      while (i < len) {
        _get_chars(s.charCodeAt(i), y);
        while (y.length >= 3) {
          var ch1 = y.shift();
          var ch2 = y.shift();
          var ch3 = y.shift();
          b10 = (ch1 << 16) | (ch2 << 8) | ch3;
          x.push(_ALPHA.charAt(b10 >> 18));
          x.push(_ALPHA.charAt((b10 >> 12) & 0x3F));
          x.push(_ALPHA.charAt((b10 >> 6) & 0x3f));
          x.push(_ALPHA.charAt(b10 & 0x3f));
        }
        i++;
      }


      switch (y.length) {
        case 1:
          var ch = y.shift();
          b10 = ch << 16;
          x.push(_ALPHA.charAt(b10 >> 18) + _ALPHA.charAt((b10 >> 12) & 0x3F) + _PADCHAR + _PADCHAR);
          break;

        case 2:
          var ch1 = y.shift();
          var ch2 = y.shift();
          b10 = (ch1 << 16) | (ch2 << 8);
          x.push(_ALPHA.charAt(b10 >> 18) + _ALPHA.charAt((b10 >> 12) & 0x3F) + _ALPHA.charAt((b10 >> 6) & 0x3f) + _PADCHAR);
          break;
      }

      return x.join("");
    },
    /**
     *BASE64  Decode for UTF-8 
     */
    decoder: function (_base64Str) {
      var _len = _base64Str.length;
      var extra_Zero_Count = 0;
      /**
       *计算在进行BASE64编码的时候，补了几个0
       */
      if (_base64Str.charAt(_len - 1) == '=') {
        //alert(_base64Str.charAt(_len-1));
        //alert(_base64Str.charAt(_len-2));
        if (_base64Str.charAt(_len - 2) == '=') {//两个等号说明补了4个0
          extra_Zero_Count = 4;
          _base64Str = _base64Str.substring(0, _len - 2);
        } else {//一个等号说明补了2个0
          extra_Zero_Count = 2;
          _base64Str = _base64Str.substring(0, _len - 1);
        }
      }

      var binaryArray = [];
      for (var i = 0, len = _base64Str.length; i < len; ++i) {
        var c = _base64Str.charAt(i);
        for (var j = 0, size = BASE64_MAPPING.length; j < size; ++j) {
          if (c == BASE64_MAPPING[j]) {
            var _tmp = _toBinary(j);
            /*不足6位的补0*/
            var _tmpLen = _tmp.length;
            if (6 - _tmpLen > 0) {
              for (var k = 6 - _tmpLen; k > 0; --k) {
                _tmp.unshift(0);
              }
            }
            binaryArray = binaryArray.concat(_tmp);
            break;
          }
        }
      }

      if (extra_Zero_Count > 0) {
        binaryArray = binaryArray.slice(0, binaryArray.length - extra_Zero_Count);
      }

      var unicode = [];
      var unicodeBinary = [];
      for (var i = 0, len = binaryArray.length; i < len;) {
        if (binaryArray[i] == 0) {
          unicode = unicode.concat(_toDecimal(binaryArray.slice(i, i + 8)));
          i += 8;
        } else {
          var sum = 0;
          while (i < len) {
            if (binaryArray[i] == 1) {
              ++sum;
            } else {
              break;
            }
            ++i;
          }
          unicodeBinary = unicodeBinary.concat(binaryArray.slice(i + 1, i + 8 - sum));
          i += 8 - sum;
          while (sum > 1) {
            unicodeBinary = unicodeBinary.concat(binaryArray.slice(i + 2, i + 8));
            i += 8;
            --sum;
          }
          unicode = unicode.concat(_toDecimal(unicodeBinary));
          unicodeBinary = [];
        }
      }
      return unicode;
    }
  };

 

  //window.BASE64 = __BASE64;
  module.exports = {
    CusBASE64: __BASE64
  }
})();
