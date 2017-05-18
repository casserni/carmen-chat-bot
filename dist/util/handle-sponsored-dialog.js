'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _botbuilder = require('botbuilder');

var _botbuilder2 = _interopRequireDefault(_botbuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (session) {
  return function (result) {
    if (!result.data) {
      return;
    }
    switch (session.message.address.channelId) {
      case 'sms':
        {
          var card = new _botbuilder2.default.HeroCard(session);

          // if there is a text body add it
          if (result.data.content.Body && result.data.content.Body.length > 0) {
            card.text(result.data.content.Body);
          }

          // if there are images attach them
          if (result.data.content.MediaUrl && result.data.content.MediaUrl.length > 0) {
            card.images(result.data.content.MediaUrl.map(function (image) {
              return _botbuilder2.default.CardImage.create(session, image);
            }));
          }

          session.send(new _botbuilder2.default.Message(session).addAttachment(card));
          break;
        }
      case 'facebook':
        session.send(new _botbuilder2.default.Message(session).sourceEvent({
          facebook: (0, _extends3.default)({
            notification_type: 'REGULAR'
          }, result.data.content.message)
        }));
        break;
      case 'slack':
        session.send(new _botbuilder2.default.Message(session).sourceEvent({
          slack: result.data.content
        }));
        break;
      default:
    }
  };
};