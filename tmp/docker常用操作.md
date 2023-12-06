# docker常用操作

## 一、docker命令


## 二、docker-compose命令

```bash
 # 1. 基于docker-compose.yml启动管理的容器
$ docker-compose up -d
# 2. 关闭并删除容器
$ docker-compose down
# 3. 开启|关闭|重启已经存在的由docker-compose维护的容器
$ docker-compose start|stop|restart
# 4. 查看由docker-compose管理的容器
$ docker-compose ps
# 5. 查看日志
$ docker-compose logs -f
```
