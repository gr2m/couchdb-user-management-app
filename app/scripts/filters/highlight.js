/* global couchDbUserManagementApp */
couchDbUserManagementApp.filter('highlight', ['$sce', function($sce) {
  'use strict';

  return function(text, phrase) {
    // Find all a tags
    var links = text.match(/<a.*(?=<\/a>)<\/a>/, 'gi');
    // Replace each a tag with a token
    if(links){
      links.forEach(function(link, index){
        text = text.replace(new RegExp('('+link+')', 'i'), '§§'+index);
      });
    }
    // highlight the rest of the text
    if (phrase) {
      text = text.replace(new RegExp('('+phrase+')', 'gi'),
        '<span class="highlighted">$1</span>');
    }
    if(links){
      links.forEach(function(link, index){
        // if the link contains the query phrase, wrap it in a highlight
        // and swap with its token
        if(phrase !== '' && link.match(new RegExp('('+phrase+')', 'gi'))){
          text = text.replace('§§'+index, '<span class="highlighted">'+link+'</span>');
        } else {
          // If the link doesn't contain the query, just swap it with its token
          text = text.replace('§§'+index, link);
        }
      });
    }
    return $sce.trustAsHtml(text);
  };
}]);
