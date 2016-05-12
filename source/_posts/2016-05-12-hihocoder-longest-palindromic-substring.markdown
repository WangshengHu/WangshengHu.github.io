---
layout: post
title: "hihoCoder#1032 - 最长回文子串"
date: 2016-05-12 16:04:46 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
回文串定义为从左往右及从右往左是完全一样的字符串。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1032)。
<!--more-->
## 解题思路
直接暴力搜索复杂度为N<sup>2</sup>。因为是求子串而非子序列，所以动态规划的思路也不可行。考虑对搜索过程进行优化：  
首先仅考虑长度为奇数的子串，那么以字符串中任意一个字符为中心搜索其最长的回文子串（利用对称）。  
其次考虑可利用的现有信息。如下：  
`caabaacd`  
假设目前已知f[4] = 7，f[5] = 1，求f[6]，我们可以发现，由于f[4] = 7，字符串[5, 7]和[3, 1]是完全相等的，即如果[1, 3]是回文子串，那么[5, 7]也是回文子串。这也就意味着如果f[2] < 3，那么f[6] = f[2]；如果f[2] >= 3，那么f[6] >= 3（注意2是6以4为中心的对称坐标）。假设每次在求第i个位置为中心的最长回文子串时，我们已知能达到最右端点P的是以第j个位置为中心的最长回文子串，其右端点为j + f[j]/2，这样我们可以得到一个下述关系：  
`f[i] >= min(f[2j-i], f[2j-2i+f[j])`  
这样每次搜索时可以省去很多冗余搜索。  
最后一个问题是怎么将上述方法推广到求偶数长度的回文子串。只需要在原字符串的基础上每两个相邻字符间插入一个特殊字符，那么原字符串的最长回文子串一定对应着新串的一个奇数最长回文子串。
## 时间复杂度
每一步里如果f[2j-i] < 2j-2i+f[j]那么f[i] = f[2j-i]，否则我们以i为中心进行扩展，此时要么最大右边界P不移动；要么最大右边界P会往右移动，最多N次。总共2N次操作。时间复杂度为2N。（参考[Longest Palindromic Substring Part II](http://articles.leetcode.com/longest-palindromic-substring-part-ii/)）
## 代码
```c++
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int longestPalSubStr(string str) {
	string modStr = "";
	modStr += str[0];
	for (int i = 1; i < str.size(); i++) {
		modStr += '$';
		modStr += str[i];
	}

	int maxL = 0;
	int* f = new int[modStr.size()];
	for (int i = 0; i < modStr.size(); i++)
		f[i] = 1;
	int maxBorder = 0;
	for (int i = 0; i < modStr.size(); i++) {
		int minL = min(f[2 * maxBorder - i], f[maxBorder] - 2 * (i - maxBorder));
		f[i] = minL > 0 ? minL : 0;
		for (int j = (minL - 1) / 2 + 1; i - j >= 0 && i + j < modStr.size(); j++) {
			if (modStr[i + j] != modStr[i - j])
				break;
			f[i] += 2;
		}
		maxBorder = f[i] / 2 + i > f[maxBorder] / 2 + maxBorder ? i : maxBorder;
		maxL = max(maxL, i % 2 == 1 ? (f[i] + 1) / 4 * 2 : (f[i] - 1) / 4 * 2 + 1 );
	}

	return maxL;
} 

int main() {
	int N = 0; 
	cin >> N;
	for (int i = 0; i < N; i++) {
		string str;
		cin >> str;

		cout << longestPalSubStr(str) << endl;
	}

	return 0;
}
```