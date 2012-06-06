#!/bin/bash

#fetch the last version of the script
lazyloader=$(curl -X GET https://raw.github.com/fasterize/lazyload/master/lazyload.min.js)

#-i edits in place. .bak is the extension used for a backup file (optional). -p is something like while gets; <script>; puts $_; end.
ruby -pi.bak -e "gsub(/<\/head>/, '<script type=\"text/javascript\">$lazyloader</script></head>')" $1

ruby -pi -e "gsub(/<img(.*)src=\"(.*)\"(.*)>/, '<img
    \1 data-src=\"\2\"
    src=data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
    onload=lzld(this) onerror=lzld(this) \3>' )" $1