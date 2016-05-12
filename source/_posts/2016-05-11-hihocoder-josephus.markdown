---
layout: post
title: "hihoCoder#1296 - 数论三·约瑟夫问题"
date: 2016-05-11 13:41:29 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
N个人围成一个圈，编号为0...N-1，随机一个数字K，从0号开始按从1到K的顺序报数，报到K的人出局，下一个人从1开始，依此循环。最后留下的人为胜者。求胜者的编号。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1296)。
<!--more-->
## 解题思路
此题是著名的约瑟夫（Josephus）问题，直接暴力解的话时间复杂度是MN。考虑递推关系，可以得到`f[n] = (f[n-1] + K) mod n`。具体证明如下：  
假设n个人排好序：  
`0 1 2 3 ... n-1`  
此时先执行第一遍报数，将位置T（(K-1) mod n）的人去掉，剩下的人排序：  
`0 1 2 ... T-1, T+1, T+2, ... n-1`  
问题转换为从T+1开始，N-1个人的约瑟夫问题，此时胜者的编号应该为(f[n-1] + T+1) mod n，即(f[n-1] + K) mod n。证毕。  
此时时间复杂度为N，但仍可进行改进。每一次递减的幅度可以更大，比如N=10，K=4：  
`0 1 2 3 4 5 6 7 8 9`  
遍历一遍，经过两轮报数，剩下的序列是：  
`0 1 2 - 4 5 6 -8 9`  
此时仍然可以用地推关系求解，从f[10]到f[8]，不过递推关系修改如下：
`f[n - n/K] < n mod K: f[n] = f[n - n/K] - n mod K + n`  
`f[n - n/K] >= n mod K: f[n] = f[n - n/K] - n mod K + (f[n - n/K] - n mod K)/(K - 1)（遍历完一遍后余下的序列不连续）`  
注意当K > n之后问题回归到最开始的解法。
## 时间复杂度
修改过后的算法时间复杂度为log<sub>K</sub>N + K。
## 代码
```c++
#include <iostream>
using namespace std;

int josephus(int n, int k) {
	if (n == 1)
		return 0;

	int ret = 0;
	if (n < k) {
		for (int i = 2; i <= n; i++)
			ret = (ret + k) % i;
		return ret;
	}

	ret = josephus(n - n / k, k);
	if (ret < n % k)
		ret = ret - n % k + n;
	else
		ret = ret - n % k + (ret - n % k) / (k - 1);

	return ret;
}

int main() {
	int t = 0;
	cin >> t;
	for (int i = 0; i < t; i++) {
		int n = 0, k = 0;
		cin >> n >> k;
		
		cout << josephus(n, k) << endl;
	}

	return 0;
}
```