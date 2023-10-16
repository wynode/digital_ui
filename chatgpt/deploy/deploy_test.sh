yarn run export
rsync -r deploy/nginx.test.conf wynode@shanghai:/home/wynode/frontend/chatgpt
rsync -r out wynode@shanghai:/home/wynode/frontend/chatgpt
