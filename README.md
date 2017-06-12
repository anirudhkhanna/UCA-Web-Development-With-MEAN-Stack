# UCA - Web Development with MEAN Stack

## Setup
1. Install Node & NPM

	a. $sudo apt-get install nodejs
	
	b. $sudo ln -s /usr/bin/nodejs /usr/bin/node
	
	c. $sudo apt-get install npm

2. Install Nodemon - $sudo npm install -g nodemon

3. Go to your project directory

4. Run $npm install   - it will install required packages automatically (express and json body parser)  
   OR try $npm install --no-bin-links if you get symlink error

5. Run $node app.js (or $nodemon app.js to auto-monitor changes) and with a browser, open http://localhost:8080/test

6. Install MongoDB - $sudo apt-get install mongodb

7. Creation of the directory where MongoDB stores its data may be needed - $sudo mkdir -p /data/db

8. To start MongoDB

    a. MongoDB service - $sudo service mongodb start
    
    b. MongoDB host daemon - $sudo mongod
    
    c. MongoDB shell - $mongo

9. If everything goes fine, start implementing your project now.

10. Refer to requirements.txt for project requirements. Be constructive, add some eye-catching features if your want to. Best of luck!

## Load balancing using NGINX
1. $sudo apt-get install nginx
2. You can now make two copies of the project. To demonstrate on local machine, make one listen to port 8081 and another to 8082. Run both the instances.
3. Make a few changes in /etc/nginx/sites-available/default
   ```
    upstream web_backend {    # NEW
        server localhost:8081;
        server localhost:8082;
    }

    server {
        listen 8080 default_server;    # CHANGED
        listen [::]:8080 default_server ipv6only=on;    # CHANGED

        root /usr/share/nginx/html;
        index index.html index.htm;

        # Make site accessible from http://localhost/
        server_name localhost;

        location / {
            # First attempt to serve request as file, then
            # as directory, then fall back to displaying a 404.
            # try_files $uri $uri/ =404;      # COMMENTED OUT
            proxy_pass http://web_backend;    # NEW
            # Uncomment to enable naxsi on this location
            # include /etc/nginx/naxsi.rules
        }
        :
        :
    }
    :
    :
   ```
4. Run NGINX - $sudo nginx  
   To restart NGINX - $sudo service nginx restart
5. Open http://localhost:8080/test. NGINX will balance the load between the two instances in a round-robin fashion.

## Benchmarking a web service
1. $sudo apt-get install apache2-utils
2. GET: $ab -c 10 -n 100 http://localhost:8080/student/
3. POST: $ab -T 'application/json' -n 10 -p post.data http://localhost:8080/
