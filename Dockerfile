FROM registry.cn-hangzhou.aliyuncs.com/firstgrid_base/nginx_node

MAINTAINER wmt 'wangmt@firstgrid.cn'

ENV NODE_VERSION 6.9.2
ENV NODE_ENV production
ENV PORT 5566
ENV APP_HOME /usr/src/app

COPY package.json /tmp/package.json

RUN cd /tmp && cnpm install
RUN mkdir -p $APP_HOME && mv /tmp/node_modules $APP_HOME

COPY nginx.conf /etc/nginx/nginx.conf

COPY . $APP_HOME

WORKDIR $APP_HOME

RUN npm run deploy:prod \
 && cp -r dist/* /usr/share/nginx/html/

CMD ["nginx", "-g","daemon off;"]

