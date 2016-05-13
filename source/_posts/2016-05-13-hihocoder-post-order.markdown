---
layout: post
title: "hihoCoder#1049 - 后序遍历"
date: 2016-05-13 15:27:37 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
给出一棵二叉树的前序和中序遍历的结果，还原这棵二叉树并输出其后序遍历的结果。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1049)。
<!--more-->
## 解题思路
经典问题。假设二叉树形如：  
{% img /images/hihocoder-post-order-1.jpg %}  
其前序为`ABDEGHCFIJ`，中序为'DBGEHACIJF'，后序为`DGHEBJIFCA`。由于前序遍历是`根节点`+`左子树`+`右子树`，中序遍历是`左子树`+`根节点`+`右子树`，因此`A`是根节点，且`BDEGH`是左子树的前序，`CFIJ`是左子树的中序，`DBGEH`为左子树的中序，`CIJF`为右子树的中序。此时我们可以发现后序即为`左子树`+`右子树`+`根节点`，即`A`一定是当前后序中最后的节点。因此可以递归的求出后序。  
## 时间复杂度
时间复杂度为N。
## 代码
```c++
#include <iostream>
#include <string>
using namespace std;

string postOrder(string preOrder, string inOrder) {
	int len = preOrder.size();
	if (len == 0)
		return "";

	int idx = 0;
	for (; idx < len; idx++)
		if (inOrder[idx] == preOrder[0])
			break;

	return postOrder(preOrder.substr(1, idx), inOrder.substr(0, idx)) +
		postOrder(preOrder.substr(idx + 1, len - idx - 1), 
			inOrder.substr(idx + 1, len - idx - 1)) + preOrder[0];
}

int main() {
	string preOrder, inOrder;
	cin >> preOrder >> inOrder;

	cout << postOrder(preOrder, inOrder);

	return 0;
}
```