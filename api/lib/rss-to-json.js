//
// TODO - this is a temporary fork which will be replaced
//
'use strict';
const util = require('util'),
  xml2js = require('xml2js'),
  request = require('request');

module.exports = {

  load: function(url, callback){
    request(getConfig(url), (error, response, xml) => {

      if (!error && response.statusCode == 200) {
        var parser = new xml2js.Parser({trim: false, normalize: true, mergeAttrs: true});
        parser.addListener("error", function(err) {
          callback(err, null);
        });
        parser.parseString(xml, (err, result) => {
          var rss = this.parser(result);
          callback(null, rss);
        });

      }else {
        this.emit('error', new Error('Bad status code'));
      }
    });
  },

  parser: function(json){
    var channel = json.rss.channel;
    var rss = {items:[]};
    if(util.isArray(json.rss.channel))
      channel = json.rss.channel[0];

    if (channel.title) {
      rss.title = channel.title[0];
    }
    if (channel.description) {
      rss.description = channel.description[0];
    }
    if (channel.link) {
      rss.url = channel.link[0];
    }
    if (channel['itunes:author']) {
      rss.author = channel['itunes:author'][0];
    }
    if (channel.item) {
      if (!util.isArray(channel.item)) {
        channel.item = [channel.item];
      }
      channel.item.forEach(val => {
        var obj = {};
        obj.title = !util.isNullOrUndefined(val.title)?val.title[0]:'';
        obj.description = !util.isNullOrUndefined(val.description)?val.description[0]:'';
        obj.url = obj.link = !util.isNullOrUndefined(val.link)?val.link[0]:'';

        if (val.pubDate) {
          //lets try basis js date parsing for now
          obj.created = Date.parse(val.pubDate[0]);
        }
        if (val['itunes:duration']) {
          obj.duration = val['itunes:duration'][0];
        }
        if (val['media:content']) {
          obj.media = val.media || {};
          obj.media.content = val['media:content'];
        }
        if (val['media:thumbnail']) {
          obj.media = val.media || {};
          obj.media.thumbnail = val['media:thumbnail'];
        } else if (val['itunes:image']) {
          obj.image = val['itunes:image'][0].href[0];
        }
        if(val.enclosure){
          obj.enclosures = [];
          if(!util.isArray(val.enclosure))
            val.enclosure = [val.enclosure];
          val.enclosure.forEach(function(enclosure){
            var enc = {};
            for (var x in enclosure) {
              enc[x] = enclosure[x][0];
            }
            obj.enclosures.push(enc);
          });

        }
        rss.items.push(obj);

      });

    }
    return rss;

  },

  read: function(url, callback){
    return this.load(url, callback);
  }

};


function getConfig(url) {
  return {
    url: url,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:45.0) Gecko/20100101 Firefox/45.0',
      accept: 'text/html,application/xhtml+xml'
    },
    pool: false,
    followRedirect: true
  };
}
