"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Returns an email address from a users message
 * @param  {String} text the users message
 * @return {Array}       array of emails found
 */
var getEmail = exports.getEmail = function getEmail(text) {
  return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
};

var placeholder = exports.placeholder = function placeholder() {};