#!/usr/bin/env node
/* Gộp bốn tệp rời thành MỘT trang tự chứa, để đăng làm Artifact hoặc gửi
   qua thư. Nguồn sự thật vẫn là du-lieu.js — tệp gộp chỉ là bản sinh ra,
   không sửa tay. Trang gộp KHÔNG có thẻ html/head/body: nơi nhận tự bọc.

     node genviet365/dong-goi-artifact.cjs [đường-dẫn-ra]
*/
'use strict';
var fs = require('fs');
var path = require('path');

var goc = __dirname;
var ra = process.argv[2] || path.join(goc, 'gen-viet-365.html');

function doc(t) { return fs.readFileSync(path.join(goc, t), 'utf8'); }

var css = doc('style.css');
var TEP_JS = ['du-lieu.js', 'du-lieu-daotao.js', 'du-lieu-vanhanh.js',
              'du-lieu-kythuat.js', 'man-hinh.js', 'giao-dien.js'];

var FONT = 'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,400;0,500;0,600;0,700;1,400' +
  '&family=Playfair+Display:ital,wght@0,600;1,600&family=IBM+Plex+Mono:wght@400;500&display=swap';

var trang =
  '<title>Kiến trúc Gen Việt 365</title>\n' +
  '<link rel="preconnect" href="https://fonts.googleapis.com">\n' +
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
  '<link rel="stylesheet" href="' + FONT + '">\n' +
  '<style>\n' + css + '\n</style>\n' +
  '<div id="ung-dung"></div>\n' +
  TEP_JS.map(function (t) { return '<script>\n' + doc(t) + '\n</script>\n'; }).join('');

fs.writeFileSync(ra, trang, 'utf8');
console.log('Đã gộp → ' + ra + '  (' + Math.round(trang.length / 1024) + ' KB)');
