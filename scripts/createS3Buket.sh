#!/bin/sh

if [[ -n "$1" ]]
then
    aws s3 mb s3://$1
    aws s3 ls
else
    echo "bucket name is empty"
fi