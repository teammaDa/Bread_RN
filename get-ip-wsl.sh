#!/bin/bash

IP=`hostname -I`
sed -i".bak" -e "/LOCAL_IP_ADDR=/d" .env
echo "LOCAL_IP_ADDR=$IP" >> .env