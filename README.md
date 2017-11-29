# To run the server

1. Install Docker
2. (For the first time) Run `bash enter_node_env.sh` and run `npm install`
3. Run `bash run_dev_server.sh`

# Clear database

1. Run `bash enter_node_env.sh` and run `npm run clear-upload`
2. Run `rm database/data.sqlite`
3. Run `bash enter_node_env.sh` and run `npm run db:migrate:latest`

# Available APIs

1. (GET) /postcard
- return nothing

2. (GET) /postcard/{code}
- return postcard data corresponding to the provided code

3. (POST) /postcard
- fields: postcard(File), image(Array[File]), video(Array[File]), audio(Array[File]), latitude(Float), longitude(Float)

4. (POST) /postcard/match
- fields: postcard(File)
