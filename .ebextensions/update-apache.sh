if [[ $(tac /etc/httpd/conf/httpd.conf | egrep -m 1 .) == $(echo 'WSGIPassAuthorization On') ]];
  then
     echo "Httpd.conf has already been updated"
  else
     echo "Updating Httpd.conf.."
     echo 'WSGIPassAuthorization On' >> /etc/httpd/conf/httpd.conf
     service httpd restart
fi