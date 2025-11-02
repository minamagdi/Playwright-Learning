FROM mcr.microsoft.com/playwright:v1.56.1-noble
WORKDIR /appHome
COPY . .
RUN apt-get update &&\
    apt-get install -y openjdk-17-jre-headless &&\
    npm install
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV commandToRunTests="npm run test"
CMD ["sh", "-c", "$commandToRunTests"]