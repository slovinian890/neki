FROM nginx:alpine

# Copy website files to nginx html directory
COPY ../index.html /usr/share/nginx/html/
COPY ../style.css /usr/share/nginx/html/
COPY ../script.js /usr/share/nginx/html/
COPY ../sitemap.xml /usr/share/nginx/html/
COPY ../robots.txt /usr/share/nginx/html/
COPY ../assets/ /usr/share/nginx/html/assets/

# Copy custom nginx configuration
COPY docker/nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 