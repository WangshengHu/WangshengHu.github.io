---
layout: post
title: "hihoCoder#1052 - 基因工程"
date: 2016-05-13 16:24:07 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
对一个长度为N的字符串，修改若干个字符使得其最前K个字符与最后K个完全一致。问最少修改数。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1052)。
<!--more-->
## 解题思路
仔细思考，最简单的情况是最前K个与最后K个没有重合，那么就是`s[i] = s[N-K+i] 其中1<=i<=K`；如果重合的话则是每隔N - K个都必须相等，即`s[i] = s[i+(N-K)] 其中1<=i<=K`，式子不变，但是要循环检查。注意遍历最前K个时只需要逐个检查到N-K就可以了，后面的已经被前面的覆盖了。
## 时间复杂度
时间复杂度为N。
## 代码
```c++
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int modify(string str, int K) {
	int minC = 0;
	int interval = str.size() - K;
	for (int i = 0; i < interval; i++) {
		int num = 0;
		int A = 0, T = 0, C = 0, G = 0;
		for (int j = i; j < str.size(); j += interval) {
			num++;
			if (str[j] == 'A')
				A++;
			else if (str[j] == 'T')
				T++;
			else if (str[j] == 'C')
				C++;
			else if (str[j] == 'G')
				G++;
		}
		int maxC = max(max(A, T), max(C, G));
		minC += num - maxC;
	}

	return minC;
}

int main() {
	int T = 0;
	cin >> T;
	for (int i = 0; i < T; i++) {
		string str;
		cin >> str;
		int K = 0;
		cin >> K;

		cout << modify(str, K) << endl;
	}

	return 0;
}
```