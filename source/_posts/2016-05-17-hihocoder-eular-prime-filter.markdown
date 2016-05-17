---
layout: post
title: "hihoCoder#1295 - 数论二·Eular质数筛法"
date: 2016-05-17 19:18:49 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
求解一个区间[1, N]所有质数的个数。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1295)。
<!--more-->
## 解题思路
**Eratosthenes筛法** 如果一个数p是质数，那么将它的倍数全部标记为质数。算法时间复杂度是NloglogN。对一个合数的每一个质因子都会计算一遍，造成了大量冗余。  
**Eular筛法** 在筛选时，无论是质数还是合数，都对它们的倍数进行标记，不过仅标记它们的质数倍。此外，在从小到大依次枚举质数p来计算i的倍数时，我们还需要检查i是否能够整除p。若i能够整除p，则停止枚举。这样可以确保每个合数仅被标记一次。时间复杂度为N。
## 时间复杂度
如上述，时间复杂度为N。
## 代码
```c++
#include <iostream>
using namespace std;

int eularPrime(int n) {
	bool* isPrime = new bool[n + 1];
	for (int i = 0; i < n + 1; i++)
		isPrime[i] = true;
	int* primeList = new int[n + 1];
	int primeCount = 0;
	for (int i = 2; i <= n; i++) {
		if (isPrime[i]) {
			primeCount++;
			primeList[primeCount] = i;
		}
		for (int j = 1; j <= primeCount; j++) {
			if (i * primeList[j] > n)
				break;
			isPrime[i * primeList[j]] = false;
			if (i % primeList[j] == 0)
				break;
		}
	}

	return primeCount;
}

int main() {
	int n = 0;
	cin >> n;

	cout << eularPrime(n);

	return 0;
}
```  