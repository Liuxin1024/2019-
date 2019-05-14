# git常用命令 #

## 起步： ##
	git init											 初始化git仓库

## 设置各种信息： ##
	git config --global user.name "liuxin1024"           设置用户名字
	git config --global user.email 747394004@qq.com      设置用户邮箱
	git config --list									 查看你的配置
	git help											 获取git 命令

## 克隆现有的仓库： ##
	git clone https://github.com/Liuxin1024/liuxinxin-.git       克隆远程仓库到本地

## 上传代码： ##
	git add .  					 把代码存入暂存区
	git commit -m "备注" 		    提交代码  // 这一步会把代码提交到分支
	git push origin master		 推送到远程仓库
	git diff					 查看改变过的代码对比
	git status 					 查看代码是什么状态（红色是暂存区，绿色是提交上分支，白色是远程线上）
	git log					     查看提交历史
	git rm 文件名				   删除指定文件
	git commit --amend 			 撤销操作

## 远程仓库相关： ##
	git remote 				              查看配置的远程仓库服务器
	git remote add 仓库名 仓库网址			 添加远程仓库
	git pull					          从远程仓库拉取

## 关于分支： ##
	git branch					   查看分支
	git branch 分支名 				 创建新的分支 （仅会创建分支，不会切换）
	git checkout 分支名			 创建分支  （如果有此分支会切换过去，若无则创建并切换）
	git branch -v			       查看分支的最后一次提交

## 关于合并： ##
	git merge				     	 合并分支
	git mergetool      				 合并的可视化工具


## 回流 ##
	前情提要：如果使用强制回滚导致后面的代码丢失（git reset --hard 2216d4e），并且跟着commit怎么找回丢失的代码并且最后一次commit也需要。
	
	git help    查看帮助
	git log     查看历史版本

	git reflog  会展示出之前所有的git操作，前面的值需要记住。

	git reset  --hard cd52afc      后面跟的这个编号就是上面展示出来的版本编号，reset是需要回滚到要去的版本。
	如果回滚到之前的版本发现之后的代码没有了，用一下方法
	git cherry-pick 4c97ff3     后面的编号是需要恢复的版本号
	恢复好之后可能会有一些代码冲突，按照提示解决就好。
---
	2019-4-1  刘鑫  周一
	2019-4-23 周二





