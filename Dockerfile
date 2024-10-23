FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN apt-get update -yq && \
    apt-get install -yq \
        libnss3-dev \
        libdbus-1-dev \
        libatk1.0-0 \
        libatk-bridge2.0-0 \
        libxcomposite-dev \
        libxrandr2 \
        gconf-service \
        libxkbcommon-x11-0 \
        libdrm-dev \
        libasound2 \
        libatk1.0-0 \
        libc6 \
        libcairo2 \
        libcups2 \
        libdbus-1-3 \
        libexpat1 \
        libfontconfig1 \
        libgbm1 \
        libgcc1 \
        libgconf-2-4 \
        libgdk-pixbuf2.0-0 \
        libglib2.0-0 \
        libgtk-3-0 \
        libnspr4 \
        libpango-1.0-0 \
        libpangocairo-1.0-0 \
        libstdc++6 \
        libx11-6 \
        libx11-xcb1 \
        libxcb1 \
        libxcomposite1 \
        libxcursor1 \
        libxdamage1 \
        libxext6 \
        libxfixes3 \
        libxi6 \
        libxrandr2 \
        libxrender1 \
        libxss1 \
        libxtst6 \
        ca-certificates \
        fonts-liberation \
        libnss3 \
        lsb-release \
        xdg-utils \
        wget

COPY . .

EXPOSE 4444

CMD [ "node", "app.js" ]