yarn install &&
yarn run build &&
rsync -r deploy/nginx/nginx.prod.conf opt@139.155.29.252:/data/opt/zhiku_ui/ &&
rsync -r dist opt@139.155.29.252:/data/opt/zhiku_ui
