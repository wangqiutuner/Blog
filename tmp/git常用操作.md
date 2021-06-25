# git常用操作

## 一、日常操作

### 保存状态

```bash
# 初始化/添加文件到暂存区/提交
$ git init
$ git add.
$ git commit -m "first commit"

# 查看当前状态
$ git status
```

### 历史记录

```bash
# 历史记录
$ git log
$ git log --graph # 查看分支合并图

$ gitk # 查看当前分支历史
$ gitk <branchname> # 查看某分支历史记录
$ gitk --all # 查看所有分支

$ git branch -v # 查看每个分支最后的提交

$ git reflog # 查看命令历史
```

### 撤销修改

```bash
# 已经push到远程仓库的commit不允许reset
$ git reset --hard HEAD^ # 回到之前的版本，工作区内容也回到之前版本
$ git reset --mixed HEAD^ # --mixed是默认参数，回到之前的版本，不改变工作区内容
$ git reset <版本号> # 回到版本号的版本

$ git checkout <版本号> # 回到版本号的"分支"

$ git revert <版本号> # 将目标版本反做一期内容并提交
```

### 分支管理

```bash
# 分支操作
$ git branch # 列出本地分支
$ git branch -a # 列出所有分支
$ git branch <branchname> # 基于当前分支创建新的分支
$ git branch -d <branchname> # 删除分支（如果分支没有合并会删除失败）
$ git branch -D <branchname> # 删除分支（即使分支没有被合并也强制删除）

$ git checkout <branchname> # 切换分支
$ git checkout -b <branchname> # 基于当前分支创建新的分支并切换分支

$ git merge # 合并分支并提交

$ git rebase # 合并分支(当前分支的内容在最前面)
$ git rebase --continue # 继续rebase
$ git rebase --abort # 取消rebase
```

## 二、 远程操作

### 远程库相关

```bash
# 将本地库与远程库相关联
$ git remote add origin git@.... # 关联后远程库的默认名字就是origin

$ git remote    # 查看远程库信息
$ git remote -v # 查看远程库详细信息
$ git remote show origin # 查看远程库信息，远程分支，还有本地分支与之相对应的关系等信息
$ git remote prune origin # 在本地删除远程不存在的分支

# 建立远程分支与本地分支的关联
$ git branch --set-upstream <branchname> origin/<branchname>
```

### 推到远程库

```bash
# 第一次推代码
$ git push -u origin master [-f] # 将本地的master分支推送到远程的master分支
# -u 把本地的master分支和远程的master分支关联起来
# -f 强制上传，可能会强制覆盖已有的分支

$ git push # 关联后可以直接推至关联分支
```

### 从远程库拉

```bash
# 拉取origin/<branchname>但不合并
git fetch origin <branchname>
# 拉取远程分支到本地
git checkout -b <branchname> origin/<branchname>

# 拉取origin/<branchname>并合并
git pull origin <branchname> # 相当于git fetch origin <branchname> + git merge origin/<branchname>

$ git pull # 关联后可以直接拉取关联分支
```

## 三、配置

```bash
# 设置用户名和邮箱
git config --global user.name "Your Name"
git config --global user.email "email@example.com"
```
