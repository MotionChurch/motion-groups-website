release:
	npm run build

deploy:
	aws --profile foursquare s3 cp --recursive build/ s3://foursquare-smallgroups/
