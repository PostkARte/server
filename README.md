# To run the server

1. Install Docker
2. (For the first time) Run `bash enter_node_env.sh` and run `npm install`
3. Run `bash run_dev_server.sh`

# Available APIs

1. (GET) /postcard
- return nothing

2. (GET) /postcard/{code}
- return postcard data corresponding to the provided code

3. (POST) /postcard
- fields: image(Array[File]), video(Array[File]), audio(Array[File]), latitude(Float), longitude(Float)
