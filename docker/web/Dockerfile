FROM ubuntu:16.04

RUN apt-get update && apt-get dist-upgrade -y
RUN apt-get install -y wget xz-utils git apache2

RUN cd /usr/local && wget https://nodejs.org/dist/v6.9.5/node-v6.9.5-linux-x64.tar.xz && tar xvf node-v6.9.5-linux-x64.tar.xz && ln -s node-v6.9.5-linux-x64 node

ENV PATH /usr/local/node/bin:$PATH

RUN npm install -g gulp

EXPOSE 80

WORKDIR /runtime
RUN git clone https://github.com/KeyboardPlaying/svg2shapescript-converter.git svg2shapescript-converter

WORKDIR /runtime/svg2shapescript-converter
RUN npm install
RUN gulp
RUN cp -pr index.html dist /var/www/html/

CMD apachectl -DFOREGROUND
