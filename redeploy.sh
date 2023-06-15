
# update

echo "################### update"
git pull


# find pid
echo "################### kill"
pid=`ps -ef|grep "python webui"|grep -v grep|awk '{print $2}'`
echo "PID:"$pid

# kill 
kill -9 $pid

# restart
echo "################### restart"
echo "restrat server will cost about 30s, please wait and open http://9.144.124.170:8080/"
nohup python webui.py >> nohup.out &


tail -0f nohup.out

exit 0
